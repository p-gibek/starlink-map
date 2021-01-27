import { MathUtils, Quaternion, Vector3 } from 'three';

const getOrbitQuaternion = (inclination: number, RAAN: number): Quaternion => {
  const xQuaternion = new Quaternion().setFromAxisAngle(
    new Vector3(1, 0, 0),
    MathUtils.degToRad(inclination - 90),
  );

  const yQuaternion = new Quaternion().setFromAxisAngle(
    new Vector3(0, 1, 0),
    MathUtils.degToRad(RAAN - 90),
  );

  return xQuaternion.premultiply(yQuaternion);
};

export default getOrbitQuaternion;
