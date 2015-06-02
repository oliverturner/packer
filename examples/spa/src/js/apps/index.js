require('sass/main.scss');
require('./index.scss');

module.exports = function () {
  // named chunk: alpha
  require.ensure(['js/components/a'], function (require) {
    require('js/components/a');
  }, 'alpha');

  // named chunk: beta
  require.ensure(['js/components/a', 'js/components/b', 'js/components/c'], function (require) {
    require('js/components/a');
    require('js/components/b');
    require('js/components/c');
  }, 'beta');

  // chunks with the same name
  require.ensure(['js/components/a', 'js/components/b'], function (require) {
    require('js/components/a');
    require('js/components/b');
  }, 'gamma');

  require.ensure(['js/components/c', 'js/components/d'], function (require) {
    require('js/components/c');
    require('js/components/d');
  }, 'gamma');
};
