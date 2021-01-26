import * as React from 'react';
import { useMemo } from 'react';
import { EARTH_RADIUS } from '../Earth/Earth.component';
import { getOrbitObjectRotation } from './Orbit.logic';

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
  const rotation = useMemo(
    () => getOrbitObjectRotation(inclination, RAOfAscNode),
    [inclination, RAOfAscNode],
  );

  return (
    <mesh rotation={rotation}>
      <torusBufferGeometry args={[EARTH_RADIUS + altitude, 5, 3, 100]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
};

export default Orbit;
