import { twoline2satrec } from 'satellite.js';
import SatelliteData from '../../interfaces/satellite-data.interface';
import SatelliteRecord from '../../interfaces/satellite-record.interface';

export const mapSatelliteDataToRecord = (
  satelliteData: SatelliteData[],
): SatelliteRecord[] =>
  satelliteData.map((el) => ({
    ...el,
    record: twoline2satrec(el.tle1, el.tle2),
  }));
