import * as React from 'react';
import { useRef } from 'react';
import { extend, ReactThreeFiber, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
    }
  }
}

const Controls: React.FC = () => {
  const controls = useRef();
  const {
    camera,
    gl: { domElement },
  } = useThree();

  // @ts-ignore
  useFrame(() => controls.current.update());

  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      minDistance={6500}
      maxDistance={25000}
      panSpeed={0.3}
      rotateSpeed={0.3}
      zoomSpeed={0.3}
    />
  );
};

export default Controls;
