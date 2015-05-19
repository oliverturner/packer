var WebPacker = require('../../dist').default;
var getEntries = require('../../dist/utils/getEntries').getEntries;
var getServerOpts = require('../../dist/utils/getServerOpts');

var isDev = process.env.NODE_ENV !== 'production';

var server = getServerOpts({
  host: 'localhost',
  port: 3001
});

var serverUrl  = server.get('url');
var publicPath = isDev ? serverUrl : '/';

var srcs = {
  sass: __dirname + '/src/sass',
  js:   __dirname + '/src/apps'
};

var urls = {
  js:  'scripts',
  css: 'styles'
};

var config = new WebPacker({
  entry:  getEntries(srcs.js, serverUrl, '.jsx'),
  output: {
    path:       __dirname + '/out',
    publicPath: publicPath
  }
}, urls.js, urls.css, srcs.sass);

console.log(JSON.stringify(config, null, 2));

module.exports = config;
