// Auto-configures entrypoints for multi-page apps
//
// In conjunction with the CommonsChunkPlugin produces optimal filesizes

import assert from 'assert';
import path from 'path';
import fs from 'fs';

function checkValidAppDir (appDir) {
  let stat = fs.statSync(appDir);
  assert(stat && stat.isDirectory(), 'Not a valid directory');
}

/**
 * @param host
 * @returns {string[]}
 */
function getHotloaderPlugins (host) {
  return [
    `webpack-dev-server/client?${host}`,
    'webpack/hot/dev-server'
  ];
}

// Loop through child modules of `appDir` to create an object used by Webpack as
// entrypoints keyed by folder name:
//```
// ./apps
// ├── about
// │   ├── entry.jsx
// │   └── index.jsx
// └── home
//     ├── entry.jsx
//     └── index.jsx
//```
// becomes...
//```
// {
//   about:   apps/about/entry.jsx,
//   home:    apps/home/entry.jsx,
//   dev:     [ // Omitted in production
//     'webpack-dev-server/client?' + host,
//     'webpack/hot/dev-server'
//   ],
// }
//```
/**
 * @param {string} appDir
 * @param {string} [file]
 * @param {string} [host]
 * @returns {*}
 */
function getEntriesMulti (appDir, host = null, file = 'entry.jsx') {
  checkValidAppDir(appDir);

  // Create a `commons` entry for code shared by components
  let extras = {};

  // In development mode an additional `dev` entry point is injected
  // (includes hot code loading and development server code)
  if (host) {
    extras.dev = getHotloaderPlugins(host);
  }

  return fs.readdirSync(appDir).reduce((ret, key) => {
    let dir, stat;

    dir  = `${appDir}/${key}`;
    stat = fs.statSync(dir);

    if (stat.isDirectory()) {
      ret[key] = `${dir}/${file}`;
    }

    return ret;
  }, extras);
}

function getEntriesSPA (appDir, host = null, ext = '.js') {
  checkValidAppDir(appDir);

  let main = fs.readdirSync(appDir)
    .map(file => path.join(appDir, file))
    .filter(file => path.extname(file) === ext);

  if (host) {
    main = main.concat(getHotloaderPlugins(host));
  }

  return {main: main};
}

export {getHotloaderPlugins, getEntriesMulti, getEntriesSPA};
