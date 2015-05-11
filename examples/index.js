var WebPacker = require('../dist').default;
var packEntries = require('../dist/utils/packEntries');

var isDev = process.env.NODE_ENV === 'development';
var host = isDev ? 'http://localhost:3001' : null;

var refs = {
  paths: {
    sass: __dirname + '/src/sass',
    js:   __dirname + '/src/apps'
  },
  urls:  {
    js:  'scripts',
    css: 'styles'
  }
};

var config = new WebPacker({
  entry:  packEntries(refs.paths.js, host),
  output: {
    path: __dirname + '/out'
  }
}, refs);

module.exports = config;
