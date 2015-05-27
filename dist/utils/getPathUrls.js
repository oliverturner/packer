'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

// _Relative_ paths (to the webDir) of asset dirs
// Uses `paths` map's keys
// ```
// webDir    =  /srv/sitename/public
// paths[js] =  /srv/sitename/public/assets/js
// urls[js]  => 'assets/js'
// ```
/**
 * @param paths
 * @param webDir
 * @returns {*|{}}
 */
function getPathUrls(paths, webDir) {
  return Object.keys(paths).reduce(function (ret, key) {
    ret[key] = _path2['default'].relative(webDir, paths[key]);

    return ret;
  }, {});
}

exports['default'] = getPathUrls;
module.exports = exports['default'];