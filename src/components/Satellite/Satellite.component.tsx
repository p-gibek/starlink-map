import * as React from 'react';

export interface SatelliteProps {
  positionVector: any;
}

const Satellite: React.FC<SatelliteProps> = ({ positionVector }) => {
  if (!positionVector) return null;

  return (
    <mesh position={positionVector}>
      <sphereBufferGeometry args={[15, 15, 15]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
};

export default Satellite;
