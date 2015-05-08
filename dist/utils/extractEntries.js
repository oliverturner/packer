'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

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
function extract(isDev, host, appDir) {
  var file = arguments[3] === undefined ? 'entry.jsx' : arguments[3];

  var extras = {
    dev: ['webpack-dev-server/client?' + host, 'webpack/hot/dev-server']
  };

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