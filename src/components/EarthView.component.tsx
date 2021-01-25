import * as React from 'react';
import { Canvas } from 'react-three-fiber';
import Earth from './Earth.component';
import Controls from './OrbitControls.component';

const EarthView: React.FC = () => (
  <Canvas camera={{ far: 30000 }}>
    <ambientLight intensity={0.1} />
    <pointLight position={[10000, 10000, 10000]} />
    <Earth position={[0, 0, 0]} />
    <Controls />
  </Canvas>
);

export default EarthView;
