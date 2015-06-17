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
 *
 * @param {string} appDir
 * @param {string} ext
 * @param {string} key
 *
 * @returns {{}}
 */
function getEntries (appDir, ext = '.jsx', key = 'main') {
  checkValidAppDir(appDir);

  let ret = {};

  ret[key] = fs.readdirSync(appDir)
    .map(file => path.join(appDir, file))
    .filter(file => path.extname(file) === ext);

  return ret;
}

// Loop through child modules of `appDir` to create an object used by Webpack as
// entrypoints keyed by folder name:
// ```
// ./apps
// ├── about
// │   ├── entry.jsx
// │   └── index.jsx
// └── home
//     ├── entry.jsx
//     └── index.jsx
// ```
// becomes...
// ```
// {
//   about:   apps/about/entry.jsx,
//   home:    apps/home/entry.jsx,
//   dev:     [ // Omitted in production
//     'webpack-dev-server/client?' + host,
//     'webpack/hot/dev-server'
//   ],
// }
// ```
/**
 * @param {string} appDir
 * @param {string} entry
 * @returns {*}
 */
function getNestedEntries (appDir, entry = 'entry.jsx') {
  checkValidAppDir(appDir);

  return fs.readdirSync(appDir).reduce((ret, key) => {
    let dir, stat;

    dir = `${appDir}/${key}`;
    stat = fs.statSync(dir);

    if (stat.isDirectory()) {
      ret[key] = `${dir}/${entry}`;
    }

    return ret;
  }, {});
}

export {getEntries, getNestedEntries};
