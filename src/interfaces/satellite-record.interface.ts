import { SatRec } from 'satellite.js';
import SatelliteData from './satellite-data.interface';

interface SatelliteRecord extends SatelliteData {
  record: SatRec;
}

export default SatelliteRecord;
