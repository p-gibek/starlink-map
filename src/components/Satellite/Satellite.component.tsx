import * as React from 'react';
import { EciVec3 } from 'satellite.js';
import { useEffect, useState } from 'react';

export interface SatelliteProps {
  positionVector: EciVec3<number>;
}

const Satellite: React.FC<SatelliteProps> = ({ positionVector }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  if (!positionVector) return null;

  return (
    <>
      <mesh
        position={[positionVector.y, positionVector.z, positionVector.x]}
        onClick={() => setIsClicked(true)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereBufferGeometry args={[90, 7, 7]} />
        <meshBasicMaterial opacity={0} transparent />
      </mesh>
      <mesh position={[positionVector.y, positionVector.z, positionVector.x]}>
        <sphereBufferGeometry args={[15, 15, 15]} />
        <meshBasicMaterial color={isClicked ? 'red' : 'white'} />
      </mesh>
    </>
  );
};

export default Satellite;
