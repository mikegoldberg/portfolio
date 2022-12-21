export type Vector3 = {
  x: number;
  y: number;
  z: number;
};

export function calculate3dDistance(p1: Vector3, p2: Vector3) {
  var a = p2.x - p1.x;
  var b = p2.y - p1.y;
  var c = p2.z - p1.z;

  return Math.sqrt(a * a + b * b + c * c);
}
