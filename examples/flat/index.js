var packer = require('../../dist');
var getEntries = require('../../dist/utils/getEntries').getEntries;
var getServerOpts = require('../../dist/utils/getServerOpts');

var isProd = process.env.NODE_ENV === 'production';

var server = getServerOpts({
  host: 'localhost',
  port: 3001
});

var serverUrl  = server.get('url');
var publicPath = isProd ? '/' : serverUrl;

var srcs = {
  sass: __dirname + '/src/sass',
  js:   __dirname + '/src/apps'
};

var urls = {
  js:  'scripts',
  css: 'styles'
};

var config = packer.client.create({
  entry:  packer.client.getEntries(serverUrl, srcs.js, '.jsx'),
  output: packer.client.getOutput(urls.js, {
    path:       __dirname + '/out',
    publicPath: publicPath
  }),
  module: {
    loaders: packer.client.getLoaders(isProd, srcs.sass)
  },

  plugins: packer.client.getPlugins(isProd, urls.js, urls.css)
});

console.log(JSON.stringify(config, null, 2));

module.exports = config;
