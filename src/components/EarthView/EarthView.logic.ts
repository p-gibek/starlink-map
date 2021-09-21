import { EciVec3, Kilometer, propagate, twoline2satrec } from 'satellite.js';
import { MathUtils, Vector3 } from 'three';
import SatelliteData from '../../interfaces/satellite-data.interface';
import SatelliteRecord from '../../interfaces/satellite-record.interface';
import SatellitePosition from '../../interfaces/satellite-position.interface';

const SECONDS_IN_DAY = 86400;
const SUN_HEIGHT = 1500000;

const getUTCSeconds = (date: Date) =>
  3600 * date.getUTCHours() + 60 * date.getUTCMinutes() + date.getUTCSeconds();

export const mapSatelliteDataToRecord = (satelliteData: SatelliteData[]): SatelliteRecord[] =>
  satelliteData.map((el) => ({
    ...el,
    record: twoline2satrec(el.tle1, el.tle2),
  }));

export const getEarthRotationForDate = (date: Date): number =>
  (getUTCSeconds(date) / SECONDS_IN_DAY) * 360 - 225;

const getSunRotationForDate = (date: Date): number =>
  (getUTCSeconds(date) / SECONDS_IN_DAY) * 360 - 270;

export const getSunPositionForDate = (date: Date) =>
  new Vector3()
    .setFromSphericalCoords(
      SUN_HEIGHT,
      Math.PI / 2,
      -MathUtils.degToRad(getSunRotationForDate(date)),
    )
    .toArray();

export const mapSatelliteToSatellitePosition = (
  satellite: SatelliteRecord,
  date: Date,
): SatellitePosition => {
  const { position } = propagate(satellite.record, date);

  if (!position) return undefined;

  return { key: satellite.noradCatID, position: position as EciVec3<Kilometer> };
};
