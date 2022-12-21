export type NamedVector3d = {
  x: number;
  y: number;
  z: number;
  name: string;
};

export default function calculateFaceAngle(mesh: Array<NamedVector3d>) {
  const leftEye = mesh.filter(
    ({ name }: NamedVector3d) => name === "leftEye"
  )[0];
  const rightEye = mesh.filter(
    ({ name }: NamedVector3d) => name === "rightEye"
  )[0];
  const faceLeft = mesh[50];
  const faceTop = mesh[10];
  const faceBottom = mesh[152];

  const angle = {
    roll: Math.atan2(leftEye.x - leftEye.z, rightEye.x - rightEye.y) - 2,
    yaw: Math.atan2(faceLeft.z, faceLeft.x) * -4,
    pitch: Math.atan2(faceTop.y - faceTop.z, faceBottom.y - faceBottom.z),
  };

  return angle;
}
