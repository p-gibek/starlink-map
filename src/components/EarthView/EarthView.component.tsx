import * as React from 'react';
import { Canvas } from 'react-three-fiber';
import { Vector3 } from 'three';
import Earth from '../Earth/Earth.component';
import Controls, {
  CAMERA_ORBIT_MAX_DISTANCE,
} from '../Controls/Controls.component';
import Orbit from '../Orbit/Orbit.component';

const AMBIENT_LIGHT_INTENSITY = 0.1;
const SUN_LIGHT_INTENSITY = 0.9;
const SUN_POSITION = new Vector3().setFromSphericalCoords(15000, 1.2, 1.5);
const EARTH_POSITION = new Vector3(0, 0, 0);

const EarthView: React.FC = () => (
  <Canvas camera={{ far: CAMERA_ORBIT_MAX_DISTANCE }}>
    <Controls />

    <ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />
    <pointLight position={SUN_POSITION} intensity={SUN_LIGHT_INTENSITY} />

    <Earth position={EARTH_POSITION} />
    <Orbit altitude={442} inclination={0} RAOfAscNode={1} />
  </Canvas>
);

export default EarthView;
