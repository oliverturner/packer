'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Auto-configures entrypoints for multi-page apps
//
// In conjunction with the CommonsChunkPlugin produces optimal filesizes

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

/**
 * @param {bool}   isDev
 * @param {string} host
 * @param {string} appDir
 * @param {string} [file]
 * @returns {*}
 */
function extract(isDev, host, appDir) {
  var file = arguments[3] === undefined ? 'entry.jsx' : arguments[3];

  // In development mode an additional 'dev' entry point is injected
  // (includes hot code loading and development server code)
  var extras = {
    dev: ['webpack-dev-server/client?' + host, 'webpack/hot/dev-server']
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
  return _fs2['default'].readdirSync(appDir).reduce(function (ret, key) {
    var dir = undefined,
        stat = undefined;

    dir = '' + appDir + '/' + key;
    stat = _fs2['default'].statSync(dir);

    if (stat.isDirectory()) {
      ret[key] = '' + dir + '/' + file;
    }

    return ret;
  }, isDev ? extras : {});
}

exports['default'] = extract;
module.exports = exports['default'];