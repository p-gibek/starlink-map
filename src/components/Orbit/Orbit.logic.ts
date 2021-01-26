import { Euler } from 'react-three-fiber';

export const getOrbitObjectRotation = (
  inclination: number,
  RAAN: number,
): Euler => {
  const x = (Math.PI / 180) * (inclination + 90);
  const y = (Math.PI / 180) * (RAAN + 90);

  return [x, y, 0];
};
