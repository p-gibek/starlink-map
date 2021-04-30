import * as React from 'react';
import { Canvas } from 'react-three-fiber';
import { Euler, Vector3 } from 'three';
import { useEffect, useMemo, useState } from 'react';
import { EciVec3, Kilometer, propagate } from 'satellite.js';
import Earth from '../Earth/Earth.component';
import Controls, { CAMERA_ORBIT_MAX_DISTANCE } from '../Controls/Controls.component';
import Satellite from '../Satellite/Satellite.component';
import SatelliteData from '../../interfaces/satellite-data.interface';
import SatelliteRecord from '../../interfaces/satellite-record.interface';
import { mapSatelliteDataToRecord } from './EarthView.logic';
import SatellitePosition from '../../interfaces/satellite-position.interface';

const AMBIENT_LIGHT_INTENSITY = 0.1;
const SUN_LIGHT_INTENSITY = 0.45;
const SUN_POSITION = new Vector3().setFromSphericalCoords(15000, Math.PI / 2, 1.5);
const EARTH_POSITION = new Vector3(0, 0, 0);
const EARTH_ROTATION = new Euler(0, -1, 0);

interface EarthViewProps {
  satelliteData: SatelliteData[];
}

const EarthView: React.FC<EarthViewProps> = ({ satelliteData = [] }) => {
  const satellites = useMemo<SatelliteRecord[]>(() => mapSatelliteDataToRecord(satelliteData), [
    satelliteData,
  ]);

  const [satellitePositions, setSatellitePositions] = useState<SatellitePosition[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      setSatellitePositions(
        satellites
          .map((satellite) => {
            const { position } = propagate(satellite.record, now);

            if (!position) return undefined;

            return { key: satellite.noradCatID, position: position as EciVec3<Kilometer> };
          })
          .filter((el) => !!el),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [satellites]);

  return (
    <Canvas camera={{ far: CAMERA_ORBIT_MAX_DISTANCE }}>
      <Controls />

      <ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />
      <pointLight position={SUN_POSITION} intensity={SUN_LIGHT_INTENSITY} />

      <Earth position={EARTH_POSITION} rotation={EARTH_ROTATION} />

      {satellitePositions.map(({ position, key }) => (
        <Satellite positionVector={position} key={key} />
      ))}
    </Canvas>
  );
};
export default EarthView;
