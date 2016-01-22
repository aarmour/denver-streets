export function getBoundingBoxFromFeatures(features) {
  // Use an invalid initial bounding box, which is guaranteed
  // to be replaced with the first point.
  const initialBoundingBox = [[180, 180], [-180, -180]];

  return features.reduce((boundingBox, feature) => {
    const center = feature.center;
    const x = center[0];
    const y = center[1];
    const minx = boundingBox[0][0];
    const miny = boundingBox[0][1];
    const maxx = boundingBox[1][0];
    const maxy = boundingBox[1][1];

    if (x < minx) boundingBox[0][0] = x;
    if (y < miny) boundingBox[0][1] = y;
    if (x > maxx) boundingBox[1][0] = x;
    if (y > maxy) boundingBox[1][1] = y;

    return boundingBox;
  }, initialBoundingBox);
}
