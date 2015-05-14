var WebPacker  = require('../../dist').default;
var getEntries = require('../../dist/utils/getEntries');

var isDev = process.env.NODE_ENV === 'development';
var host = isDev ? 'http://localhost:3001' : null;

var refs = {
  srcs: {
    sass: __dirname + '/src/sass',
    js:   __dirname + '/src/apps'
  },
  urls:  {
    js:  'scripts',
    css: 'styles'
  }
};

var config = new WebPacker({
  entry:  getEntries(refs.srcs.js, host),
  output: {
    path: __dirname + '/out'
  }
}, refs);

console.log(JSON.stringify(config, null, 2));

module.exports = config;
