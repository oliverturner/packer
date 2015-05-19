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
 * @param opts {{
 *   [host]: string
 *   [entry]: string
 * }}
 * @returns {*}
 */
function getEntriesMulti (appDir, opts = {}) {
  checkValidAppDir(appDir);

  let defaults = {
    host:  null,
    entry: 'entry.jsx'
  };

  opts = Object.assign(defaults, opts);

  let extras = {};

  // In development mode an additional `dev` entry point is injected
  // (includes hot code loading and development server code)
  if (opts.host) {
    extras.dev = getHotloaderPlugins(opts.host);
  }

  return fs.readdirSync(appDir).reduce((ret, key) => {
    let dir, stat;

    dir  = `${appDir}/${key}`;
    stat = fs.statSync(dir);

    if (stat.isDirectory()) {
      ret[key] = `${dir}/${opts.entry}`;
    }

    return ret;
  }, extras);
}

/**
 *
 * @param {string} appDir
 * @param opts {{
 *   [host]: string|null,
 *   [ext]:  string,
 *   [key]:  string
 * }}
 * @returns {{}}
 */
function getEntries (appDir, opts = {}) {
  checkValidAppDir(appDir);

  let defaults = {
    host: null,
    ext:  '.js',
    key:  'main'
  };

  opts = Object.assign(defaults, opts);

  let ret = {};
  let main = fs.readdirSync(appDir)
    .map(file => path.join(appDir, file))
    .filter(file => path.extname(file) === opts.ext);

  if (opts.host) {
    main = main.concat(getHotloaderPlugins(opts.host));
  }

  ret[opts.key] = main;

  return ret;
}

export {getHotloaderPlugins, getEntries, getEntriesMulti};
