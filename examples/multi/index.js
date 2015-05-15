var WebPacker  = require('../../dist').default;
var getEntries = require('../../dist/utils/getEntries');

var isDev = process.env.NODE_ENV === 'development';
var host = isDev ? 'http://localhost:3001' : null;

var srcs = {
  sass: __dirname + '/src/sass',
  js:   __dirname + '/src/apps'
};

var urls = {
  js:  'scripts',
  css: 'styles'
};

var config = new WebPacker({
  entry:  getEntries(srcs.js, host),
  output: {
    path: __dirname + '/out'
  }
}, urls.js, urls.css, srcs.sass);

console.log(JSON.stringify(config, null, 2));

module.exports = config;
