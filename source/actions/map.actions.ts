export const CENTER_MAP = 'CENTER_MAP';

export function centerMap(point) {
  return {
    type: CENTER_MAP,
    point
  };
}
