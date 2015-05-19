'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Auto-configures entrypoints for multi-page apps
//
// In conjunction with the CommonsChunkPlugin produces optimal filesizes

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
 * @param opts {{
 *   [host]: string
 *   [entry]: string
 * }}
 * @returns {*}
 */
function getEntriesMulti(appDir) {
  var opts = arguments[1] === undefined ? {} : arguments[1];

  checkValidAppDir(appDir);

  var defaults = {
    host: null,
    entry: 'entry.jsx'
  };

  opts = _extends(defaults, opts);

  var extras = {};

  // In development mode an additional `dev` entry point is injected
  // (includes hot code loading and development server code)
  if (opts.host) {
    extras.dev = getHotloaderPlugins(opts.host);
  }

  return _fs2['default'].readdirSync(appDir).reduce(function (ret, key) {
    var dir = undefined,
        stat = undefined;

    dir = '' + appDir + '/' + key;
    stat = _fs2['default'].statSync(dir);

    if (stat.isDirectory()) {
      ret[key] = '' + dir + '/' + opts.entry;
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
function getEntries(appDir) {
  var opts = arguments[1] === undefined ? {} : arguments[1];

  checkValidAppDir(appDir);

  var defaults = {
    host: null,
    ext: '.js',
    key: 'main'
  };

  opts = _extends(defaults, opts);

  var ret = {};
  var main = _fs2['default'].readdirSync(appDir).map(function (file) {
    return _path2['default'].join(appDir, file);
  }).filter(function (file) {
    return _path2['default'].extname(file) === opts.ext;
  });

  if (opts.host) {
    main = main.concat(getHotloaderPlugins(opts.host));
  }

  ret[opts.key] = main;

  return ret;
}

exports.getHotloaderPlugins = getHotloaderPlugins;
exports.getEntries = getEntries;
exports.getEntriesMulti = getEntriesMulti;