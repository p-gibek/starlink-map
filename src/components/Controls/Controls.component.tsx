import * as React from 'react';
import { useEffect, useRef } from 'react';
import { extend, ReactThreeFiber, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EARTH_RADIUS } from '../Earth/Earth.component';

export const CAMERA_ORBIT_MIN_DISTANCE = EARTH_RADIUS + 1000;
export const CAMERA_ORBIT_MAX_DISTANCE = 45000;
export const BASE_CAMERA_PAN_SPEED = 0.3;
export const BASE_CAMERA_ROTATE_SPEED = 0.3;
export const BASE_CAMERA_ZOOM_SPEED = 0.6;

const Controls: React.FC = () => {
  useEffect(() => {
    extend({ OrbitControls });
  }, []);

  const controls = useRef<ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>>();

  const {
    camera,
    gl: { domElement },
  } = useThree();

  useFrame(() => controls.current.update());

  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      minDistance={CAMERA_ORBIT_MIN_DISTANCE}
      maxDistance={CAMERA_ORBIT_MAX_DISTANCE}
      panSpeed={BASE_CAMERA_PAN_SPEED}
      rotateSpeed={BASE_CAMERA_ROTATE_SPEED}
      zoomSpeed={BASE_CAMERA_ZOOM_SPEED}
      enablePan={false}
    />
  );
};

export default Controls;
