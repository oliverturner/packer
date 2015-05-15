var Immutable = require('immutable');

var WebPacker = require('../../dist').default;
var getServerOpts = require('../../dist/utils/getServerOpts');

var isDev = process.env.NODE_ENV !== 'production';

var server = getServerOpts(Immutable.Map({
  host: 'localhost',
  port: 3001
}));

var publicPath = isDev ? server.get('url') + '/' : '/';

var srcs = {
  sass: __dirname + '/src/sass',
  js:   __dirname + '/src/apps'
};

var urls = {
  js:  'scripts',
  css: 'styles'
};

var config = new WebPacker({
  entry:  srcs.js,
  output: {
    path:       __dirname + '/out',
    publicPath: publicPath
  }
}, urls.js, urls.css, srcs.sass);

console.log(JSON.stringify(config, null, 2));

module.exports = config;
