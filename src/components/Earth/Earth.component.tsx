import * as React from 'react';
import { TextureLoader } from 'three';
import earthImage from '../../assets/8k_earth_daymap-2.jpg';
import isBrowser from '../../utils/is-browser';

const earthTexture = isBrowser ? new TextureLoader().load(earthImage) : null;

export const EARTH_RADIUS = 6371; // Mean Earth radius in kilometers.
const EARTH_HORIZONTAL_SEGMENTS = 80;
const EARTH_VERTICAL_SEGMENTS = 80;

const Earth: React.FC = () => (
  <mesh position={[0, 0, 0]}>
    <sphereBufferGeometry
      args={[EARTH_RADIUS, EARTH_HORIZONTAL_SEGMENTS, EARTH_VERTICAL_SEGMENTS]}
    />
    <meshStandardMaterial map={earthTexture} />
  </mesh>
);

export default Earth;
