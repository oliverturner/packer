'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
function getDevServer(port) {
  var addr = arguments[1] === undefined ? 'localhost' : arguments[1];

  var url = undefined;

  url = 'http://' + addr + ':' + port;

  return { addr: addr, port: port, url: url };
}

exports['default'] = getDevServer;
module.exports = exports['default'];