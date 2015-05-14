'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function getLoader(loader) {
  var parts = undefined,
      module = undefined,
      suffix = undefined,
      splitter = undefined;

  parts = loader.split('?');
  module = parts[0];
  suffix = parts[1] || '';
  splitter = suffix.length ? '?' : '';

  return '' + module + '-loader' + splitter + '' + suffix;
}

exports['default'] = getLoader;
module.exports = exports['default'];