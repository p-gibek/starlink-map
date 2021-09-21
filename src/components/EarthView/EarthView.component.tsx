import * as React from 'react';
import { Canvas } from 'react-three-fiber';
import THREE, { MathUtils } from 'three';
import { useEffect, useMemo, useState } from 'react';
import Earth from '../Earth/Earth.component';
import Controls, { CAMERA_ORBIT_MAX_DISTANCE } from '../Controls/Controls.component';
import Satellite from '../Satellite/Satellite.component';
import SatelliteData from '../../interfaces/satellite-data.interface';
import SatelliteRecord from '../../interfaces/satellite-record.interface';
import {
  getEarthRotationForDate,
  getSunPositionForDate,
  mapSatelliteDataToRecord,
  mapSatelliteToSatellitePosition,
} from './EarthView.logic';
import SatellitePosition from '../../interfaces/satellite-position.interface';

const AMBIENT_LIGHT_INTENSITY = 0.15;
const SUN_LIGHT_INTENSITY = 1;
const SATELLITES_POSITION_REFRESH_TIME = 1000;
const INIT_CAMERA_HEIGHT = 30000;
const CAMERA_FOV = 30;

interface EarthViewProps {
  satelliteData: SatelliteData[];
}

const EarthView: React.FC<EarthViewProps> = ({ satelliteData = [] }) => {
  const satellites = useMemo<SatelliteRecord[]>(() => mapSatelliteDataToRecord(satelliteData), [
    satelliteData,
  ]);

  const [satellitePositions, setSatellitePositions] = useState<SatellitePosition[]>([]);
  const [earthRotation, setEarthRotation] = useState(0);
  const [sunPosition, setSunPosition] = useState<Parameters<THREE.Vector3['set']>>([0, 0, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      setEarthRotation(getEarthRotationForDate(now));
      setSunPosition(getSunPositionForDate(now));

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
      camera={{
        far: CAMERA_ORBIT_MAX_DISTANCE,
        fov: CAMERA_FOV,
        position: [0, 0, INIT_CAMERA_HEIGHT],
      }}
    >
      <Controls />

      <ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />
      <pointLight position={sunPosition} intensity={SUN_LIGHT_INTENSITY} />
      <Earth />

      <group rotation={[0, -MathUtils.degToRad(earthRotation), 0]}>
        {satellitePositions.map(({ position, key }) => (
          <Satellite positionVector={position} key={key} />
        ))}
      </group>
    </Canvas>
  );
};
export default EarthView;
