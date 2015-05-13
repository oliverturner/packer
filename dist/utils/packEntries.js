// Auto-configures entrypoints for multi-page apps
//
// In conjunction with the CommonsChunkPlugin produces optimal filesizes

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

/**
 * @param {string} appDir
 * @param {string} [file]
 * @param {string} [host]
 * @returns {*}
 */
function extract(appDir) {
  var host = arguments[1] === undefined ? null : arguments[1];
  var file = arguments[2] === undefined ? 'entry.jsx' : arguments[2];

  // Create a `commons` entry for code shared by components
  var extras = {
    commons: []
  };

  // In development mode an additional 'dev' entry point is injected
  // (includes hot code loading and development server code)
  if (host) {
    extras.dev = ['webpack-dev-server/client?' + host, 'webpack/hot/dev-server'];
  }

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
  //   commons: [],
  //   about:   apps/about/entry.jsx,
  //   home:    apps/home/entry.jsx,
  //   dev:     [ // Omitted in production
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
  }, extras);
}

exports['default'] = extract;
module.exports = exports['default'];