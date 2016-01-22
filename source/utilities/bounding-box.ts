export function containsPoint(boundingBox, point) {
  const x = point[0];
  const y = point[1];
  const minx = boundingBox[0][0];
  const miny = boundingBox[0][1];
  const maxx = boundingBox[1][0];
  const maxy = boundingBox[1][1];

  return x >= minx &&
         x <= maxx &&
         y >= miny &&
         y <= maxy;
}
