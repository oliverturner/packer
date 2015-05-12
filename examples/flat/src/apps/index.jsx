require('./index.scss');

module.exports = function () {
  console.log('index');

  // named chunk: alpha
  require.ensure(['a'], function (require) {
    require('a');
  }, 'alpha');

  // named chunk: beta
  require.ensure(['a', 'b', 'c'], function (require) {
    require('a');
    require('b');
    require('c');
  }, 'beta');

  // chunks with the same name
  require.ensure(['a', 'b'], function (require) {
    require('a');
    require('b');
  }, 'gamma');

  require.ensure(['c', 'd'], function (require) {
    require('c');
    require('d');
  }, 'gamma');
};
