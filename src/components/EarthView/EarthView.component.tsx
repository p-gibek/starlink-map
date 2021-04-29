import * as React from 'react';
import { Canvas } from 'react-three-fiber';
import { Vector3 } from 'three';
import { useEffect, useMemo, useState } from 'react';
import { EciVec3, Kilometer, propagate } from 'satellite.js';
import Earth from '../Earth/Earth.component';
import Controls, { CAMERA_ORBIT_MAX_DISTANCE } from '../Controls/Controls.component';
import Orbit from '../Orbit/Orbit.component';
import Satellite from '../Satellite/Satellite.component';
import SatelliteData from '../../interfaces/satellite-data.interface';
import SatelliteRecord from '../../interfaces/satellite-record.interface';
import { mapSatelliteDataToRecord } from './EarthView.logic';
import SatellitePosition from '../../interfaces/satellite-position.interface';

const AMBIENT_LIGHT_INTENSITY = 0.1;
const SUN_LIGHT_INTENSITY = 0.9;
const SUN_POSITION = new Vector3().setFromSphericalCoords(15000, 1.2, 1.5);
const EARTH_POSITION = new Vector3(0, 0, 0);

const MOCK_ORBITS = [
  { key: 1, inclination: 53, RAOfAscNode: 0 },
  { key: 2, inclination: 53, RAOfAscNode: 15 },
  { key: 3, inclination: 53, RAOfAscNode: 30 },
  { key: 4, inclination: 53, RAOfAscNode: 45 },
  { key: 5, inclination: 53, RAOfAscNode: 60 },
  { key: 6, inclination: 53, RAOfAscNode: 75 },
  { key: 7, inclination: 53, RAOfAscNode: 90 },
  { key: 8, inclination: 53, RAOfAscNode: 105 },
  { key: 9, inclination: 53, RAOfAscNode: 120 },
  { key: 10, inclination: 53, RAOfAscNode: 135 },
  { key: 11, inclination: 53, RAOfAscNode: 150 },
  { key: 12, inclination: 53, RAOfAscNode: 165 },
  { key: 13, inclination: 53, RAOfAscNode: 180 },
  { key: 14, inclination: 53, RAOfAscNode: 195 },
  { key: 15, inclination: 53, RAOfAscNode: 210 },
  { key: 16, inclination: 53, RAOfAscNode: 225 },
  { key: 17, inclination: 53, RAOfAscNode: 240 },
  { key: 18, inclination: 53, RAOfAscNode: 255 },
  { key: 19, inclination: 53, RAOfAscNode: 270 },
  { key: 20, inclination: 53, RAOfAscNode: 285 },
  { key: 21, inclination: 53, RAOfAscNode: 300 },
  { key: 22, inclination: 53, RAOfAscNode: 315 },
  { key: 23, inclination: 53, RAOfAscNode: 330 },
  { key: 24, inclination: 53, RAOfAscNode: 345 },
];

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

      <Earth position={EARTH_POSITION} />
      {MOCK_ORBITS.map((orbit) => (
        <Orbit
          key={orbit.key}
          altitude={546}
          inclination={orbit.inclination}
          RAOfAscNode={orbit.RAOfAscNode}
        />
      ))}
      {satellitePositions.map(({ position, key }) => (
        <Satellite positionVector={[position.x, position.z, position.y]} key={key} />
      ))}
    </Canvas>
  );
};
export default EarthView;
