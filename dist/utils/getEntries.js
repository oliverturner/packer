// Auto-configures entrypoints for multi-page apps
//
// In conjunction with the CommonsChunkPlugin produces optimal filesizes

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function checkValidAppDir(appDir) {
  var stat = _fs2['default'].statSync(appDir);
  (0, _assert2['default'])(stat && stat.isDirectory(), 'Not a valid directory');
}

/**
 * @param host
 * @returns {string[]}
 */
function getHotloaderPlugins(host) {
  return ['webpack-dev-server/client?' + host, 'webpack/hot/dev-server'];
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
function getEntriesMulti(appDir) {
  var host = arguments[1] === undefined ? null : arguments[1];
  var file = arguments[2] === undefined ? 'entry.jsx' : arguments[2];

  checkValidAppDir(appDir);

  // Create a `commons` entry for code shared by components
  var extras = {};

  // In development mode an additional `dev` entry point is injected
  // (includes hot code loading and development server code)
  if (host) {
    extras.dev = getHotloaderPlugins(host);
  }

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

function getEntries(appDir) {
  var host = arguments[1] === undefined ? null : arguments[1];
  var ext = arguments[2] === undefined ? '.js' : arguments[2];

  checkValidAppDir(appDir);

  var main = _fs2['default'].readdirSync(appDir).map(function (file) {
    return _path2['default'].join(appDir, file);
  }).filter(function (file) {
    return _path2['default'].extname(file) === ext;
  });

  if (host) {
    main = main.concat(getHotloaderPlugins(host));
  }

  return { main: main };
}

exports.getHotloaderPlugins = getHotloaderPlugins;
exports.getEntries = getEntries;
exports.getEntriesMulti = getEntriesMulti;