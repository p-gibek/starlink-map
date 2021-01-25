import * as React from 'react';
import { MeshProps } from 'react-three-fiber';
import { TextureLoader } from 'three';
import * as earthImage from '../assets/8k_earth_daymap.jpg';

const earthTexture = new TextureLoader().load(earthImage);

const Earth: React.FC<MeshProps> = (props) => (
  <mesh {...props}>
    <sphereBufferGeometry args={[6371, 64, 64]} />
    <meshStandardMaterial map={earthTexture} />
  </mesh>
);

export default Earth;
