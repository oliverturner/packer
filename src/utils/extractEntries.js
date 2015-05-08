// Auto-configures entrypoints for multi-page apps
//
// In conjunction with the CommonsChunkPlugin produces optimal filesizes

import fs from 'fs';

/**
 * @param {bool}   isDev
 * @param {string} host
 * @param {string} appDir
 * @param {string} [file]
 * @returns {*}
 */
function extract (isDev, host, appDir, file = 'entry.jsx') {

  // In development mode an additional 'dev' entry point is injected
  // (includes hot code loading and development server code)
  let extras = {
    dev: [
      'webpack-dev-server/client?' + host,
      'webpack/hot/dev-server'
    ]
  };

  // Loop through child modules of appDir to create an object used by Webpack as
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
  //   about: apps/about/entry.jsx,
  //   home:  apps/home/entry.jsx,
  //   dev:   [ // Omitted in production
  //     'webpack-dev-server/client?' + host,
  //     'webpack/hot/dev-server'
  //   ],
  // }
  //```
  return fs.readdirSync(appDir).reduce((ret, key) => {
    let dir, stat;

    dir  = `${appDir}/${key}`;
    stat = fs.statSync(dir);

    if (stat.isDirectory()) {
      ret[key] = `${dir}/${file}`;
    }

    return ret;
  }, isDev ? extras : {});
}

export default extract;
