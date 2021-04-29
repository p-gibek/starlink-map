import SatelliteData from '../interfaces/satellite-data.interface';

const fetchSatellites = (): Promise<SatelliteData[]> =>
  fetch(`${process.env.API_URL}/satellites`).then((res) => res.json());

export default fetchSatellites;
