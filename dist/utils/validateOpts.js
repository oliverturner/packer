'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _immutable = require('immutable');

// Check that options are present and valid
function validateOpts(reqs, options) {
  (0, _assert2['default'])(options, 'No options supplied');

  // Loop over the reqs object and apply constraints: type, valid path, etc.
  Object.keys(reqs).forEach(function (key) {
    var option = options[key];
    var req = reqs[key];

    (0, _assert2['default'])(typeof option !== 'undefined', '' + key + ' must be supplied');

    if (req.type) {
      (0, _assert2['default'])(typeof option === req.type, '' + key + ' must be of type ' + req.type + ' not ' + typeof option);
    }

    if (req.props) {
      if (_immutable.Map.isMap(option)) {
        req.props.forEach(function (prop) {
          return (0, _assert2['default'])(option.has(prop), '' + key + '.' + prop + ' must be supplied');
        });
      } else {
        req.props.forEach(function (prop) {
          return (0, _assert2['default'])(typeof option[prop] !== 'undefined', '' + key + '.' + prop + ' must be supplied');
        });
      }
    }

    if (req.path) {
      (0, _assert2['default'])(_fs2['default'].statSync(option).isDirectory(), '' + key + ' must be a valid directory');
    }
  });
}

exports['default'] = validateOpts;
module.exports = exports['default'];