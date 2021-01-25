import * as React from 'react';
import { MeshProps } from 'react-three-fiber';
import { TextureLoader } from 'three';
import * as earthImage from '../../assets/8k_earth_daymap.jpg';

const earthTexture = new TextureLoader().load(earthImage);

export const EARTH_RADIUS = 6371; // Mean Earth radius in kilometers.
const EARTH_HORIZONTAL_SEGMENTS = 80;
const EARTH_VERTICAL_SEGMENTS = 80;

const Earth: React.FC<MeshProps> = ({ position }) => (
  <mesh position={position}>
    <sphereBufferGeometry
      args={[EARTH_RADIUS, EARTH_HORIZONTAL_SEGMENTS, EARTH_VERTICAL_SEGMENTS]}
    />
    <meshStandardMaterial map={earthTexture} />
  </mesh>
);

export default Earth;
