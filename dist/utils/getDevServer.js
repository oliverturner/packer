'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function getDevServer(port) {
  var host = arguments[1] === undefined ? 'localhost' : arguments[1];

  var url = undefined;

  url = 'http://' + host + ':' + port;

  return { host: host, port: port, url: url };
}

exports['default'] = getDevServer;
module.exports = exports['default'];