import path from 'path';

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
function getPathUrls (paths, webDir) {
  return Object.keys(paths).reduce(function (ret, key) {
    ret[key] = path.relative(webDir, paths[key]);

    return ret;
  }, {});
}

export default getPathUrls;
