import * as React from 'react';
import { EciVec3 } from 'satellite.js';

export interface SatelliteProps {
  positionVector: EciVec3<number>;
}

const Satellite: React.FC<SatelliteProps> = ({ positionVector }) => {
  if (!positionVector) return null;

  return (
    <mesh position={[positionVector.y, positionVector.z, positionVector.x]}>
      <sphereBufferGeometry args={[15, 15, 15]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
};

export default Satellite;
