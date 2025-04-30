export function normalizeVector([x, y, z]) {
  const mag = Math.sqrt(x * x + y * y + z * z);
  if (mag === 0) return [0, 0, 0];
  return [x / mag, y / mag, z / mag];
}

export function getVectorMagnitude([x, y, z]) {
  return Math.sqrt(x * x + y * y + z * z);
}
