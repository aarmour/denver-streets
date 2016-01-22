export const encodings = {
  SPACE: '%20'
};

const matchEncodedSpaces = new RegExp(encodings.SPACE, 'g');

export function encodePathPart(value: string) {
  return encodeURIComponent(value).replace(matchEncodedSpaces, '+');
}
