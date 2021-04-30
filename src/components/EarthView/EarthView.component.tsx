import * as React from 'react';
import { Canvas } from 'react-three-fiber';
import { MathUtils, Vector3 } from 'three';
import { useEffect, useMemo, useState } from 'react';
import Earth from '../Earth/Earth.component';
import Controls, { CAMERA_ORBIT_MAX_DISTANCE } from '../Controls/Controls.component';
import Satellite from '../Satellite/Satellite.component';
import SatelliteData from '../../interfaces/satellite-data.interface';
import SatelliteRecord from '../../interfaces/satellite-record.interface';
import {
  getEarthRotationForDate,
  mapSatelliteDataToRecord,
  mapSatelliteToSatellitePosition,
} from './EarthView.logic';
import SatellitePosition from '../../interfaces/satellite-position.interface';

const AMBIENT_LIGHT_INTENSITY = 0.1;
const SUN_LIGHT_INTENSITY = 0.45;
const SUN_POSITION = new Vector3().setFromSphericalCoords(15000, Math.PI / 2, 1.5);
const SATELLITES_POSITION_REFRESH_TIME = 1000;
const INIT_CAMERA_HEIGHT = 30000;

interface EarthViewProps {
  satelliteData: SatelliteData[];
}

const EarthView: React.FC<EarthViewProps> = ({ satelliteData = [] }) => {
  const satellites = useMemo<SatelliteRecord[]>(() => mapSatelliteDataToRecord(satelliteData), [
    satelliteData,
  ]);

  const [satellitePositions, setSatellitePositions] = useState<SatellitePosition[]>([]);
  const [earthRotation, setEarthRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      setEarthRotation(getEarthRotationForDate(now));

      setSatellitePositions(
        satellites
          .map((satellite) => mapSatelliteToSatellitePosition(satellite, now))
          .filter((el) => !!el),
      );
    }, SATELLITES_POSITION_REFRESH_TIME);
    return () => clearInterval(interval);
  }, [satellites]);

  return (
    <Canvas
      camera={{ far: CAMERA_ORBIT_MAX_DISTANCE, fov: 30, position: [0, 0, INIT_CAMERA_HEIGHT] }}
    >
      <Controls />

      <ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />
      <pointLight position={SUN_POSITION} intensity={SUN_LIGHT_INTENSITY} />
      <Earth />

      <group rotation={[0, MathUtils.degToRad(earthRotation), 0]}>
        {satellitePositions.map(({ position, key }) => (
          <Satellite positionVector={position} key={key} />
        ))}
      </group>
    </Canvas>
  );
};
export default EarthView;
