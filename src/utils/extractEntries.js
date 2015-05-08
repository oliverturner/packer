import fs from 'fs';

/**
 * Loop through child modules of appDir to create an object used by Webpack as
 * entrypoints keyed by folder name:
 *
 * home
 * ├── entry.jsx
 * └── index.jsx
 *
 * becomes...
 * {home: apps/home/entry.jsx}
 *
 * In development mode an additional 'dev' entry point is injected
 * (includes hot code loading and development server code)
 *
 * @param isDev
 * @param host
 * @param appDir
 * @param file
 *
 * @returns {*}
 */
function extract (isDev, host, appDir, file = 'entry.jsx') {

  let extras = {
    dev: [
      'webpack-dev-server/client?' + host,
      'webpack/hot/dev-server'
    ]
  };

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
