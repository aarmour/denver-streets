import fs from 'fs';
import path from 'path';

const stylesheets = [
  './node_modules/normalize.css/normalize.css',
  './node_modules/mapbox-gl/dist/mapbox-gl.css'
];

let styles = stylesheets.map(stylesheet => {
  const stylesheetPath = path.resolve(process.cwd(), stylesheet);

  return fs.readFileSync(stylesheetPath, 'utf8');
}, '').join('\n');

styles += fs.readFileSync(path.resolve(__dirname, './inline-style.css'));

export default styles;
