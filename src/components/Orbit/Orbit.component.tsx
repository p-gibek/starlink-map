import * as React from 'react';
import { useMemo } from 'react';
import { EARTH_RADIUS } from '../Earth/Earth.component';
import getOrbitQuaternion from './Orbit.logic';

export interface OrbitProps {
  altitude: number;
  inclination: number;
  RAOfAscNode: number;
}

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
      <torusBufferGeometry args={[EARTH_RADIUS + altitude, 5, 3, 100]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
};

export default Orbit;
