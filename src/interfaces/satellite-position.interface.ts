import { EciVec3, Kilometer } from 'satellite.js';

interface SatellitePosition {
  key: string;
  position: EciVec3<Kilometer>;
}

export default SatellitePosition;
