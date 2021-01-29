import * as React from 'react';
import { useMemo } from 'react';
import { EARTH_RADIUS } from '../Earth/Earth.component';
import getOrbitQuaternion from './Orbit.logic';

export interface OrbitProps {
  altitude: number;
  inclination: number;
  RAOfAscNode: number;
}

const ORBIT_TUBULAR_SEGMENTS = 200;
const ORBIT_RADIAL_SEGMENTS = 3;
const ORBIT_TUBE_SIZE = 5;

const Orbit: React.FC<OrbitProps> = ({
  altitude = 0,
  inclination = 0,
  RAOfAscNode = 0,
}) => {
  const quaternion = useMemo(
    () => getOrbitQuaternion(inclination, RAOfAscNode),
    [inclination, RAOfAscNode],
  );

  return (
    <mesh quaternion={quaternion}>
      <torusBufferGeometry
        args={[
          EARTH_RADIUS + altitude,
          ORBIT_TUBE_SIZE,
          ORBIT_RADIAL_SEGMENTS,
          ORBIT_TUBULAR_SEGMENTS,
        ]}
      />
      <meshBasicMaterial color="white" />
    </mesh>
  );
};

export default Orbit;
