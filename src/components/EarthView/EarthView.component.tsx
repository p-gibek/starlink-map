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

const MOCK_ORBITS = [
  { inclination: 53, RAOfAscNode: 0 },
  { inclination: 53, RAOfAscNode: 15 },
  { inclination: 53, RAOfAscNode: 30 },
  { inclination: 53, RAOfAscNode: 45 },
  { inclination: 53, RAOfAscNode: 60 },
  { inclination: 53, RAOfAscNode: 75 },
  { inclination: 53, RAOfAscNode: 90 },
  { inclination: 53, RAOfAscNode: 105 },
  { inclination: 53, RAOfAscNode: 120 },
  { inclination: 53, RAOfAscNode: 135 },
  { inclination: 53, RAOfAscNode: 150 },
  { inclination: 53, RAOfAscNode: 165 },
  { inclination: 53, RAOfAscNode: 180 },
  { inclination: 53, RAOfAscNode: 195 },
  { inclination: 53, RAOfAscNode: 210 },
  { inclination: 53, RAOfAscNode: 225 },
  { inclination: 53, RAOfAscNode: 240 },
  { inclination: 53, RAOfAscNode: 255 },
  { inclination: 53, RAOfAscNode: 270 },
  { inclination: 53, RAOfAscNode: 285 },
  { inclination: 53, RAOfAscNode: 300 },
  { inclination: 53, RAOfAscNode: 315 },
  { inclination: 53, RAOfAscNode: 330 },
  { inclination: 53, RAOfAscNode: 345 },
];

const EarthView: React.FC = () => (
  <Canvas camera={{ far: CAMERA_ORBIT_MAX_DISTANCE }}>
    <Controls />

    <ambientLight intensity={AMBIENT_LIGHT_INTENSITY} />
    <pointLight position={SUN_POSITION} intensity={SUN_LIGHT_INTENSITY} />

    <Earth position={EARTH_POSITION} />
    {MOCK_ORBITS.map((orbit) => (
      <Orbit
        altitude={442}
        inclination={orbit.inclination}
        RAOfAscNode={orbit.RAOfAscNode}
      />
    ))}
  </Canvas>
);

export default EarthView;
