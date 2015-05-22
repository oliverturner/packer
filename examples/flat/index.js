var Packer = require('../../dist');
var getEntries = require('../../dist/utils/getEntries').getEntries;
var getServerOpts = require('../../dist/utils/getServerOpts');

var appPort = 3000;
var appServer = getServerOpts({port: appPort});
var devServer = getServerOpts(appServer.set('port', appPort + 1));

var packer = new Packer({
  devServer: devServer.toObject(),
  srcs: {
    sass: __dirname + '/src/sass',
    js:   __dirname + '/src/apps'
  },
  urls: {
    js:  'scripts',
    css: 'styles'
  }
});

var config = packer.client.create({
  entry:  packer.client.getEntries('.jsx'),
  output: packer.client.getOutput({
    path: __dirname + '/out'
  }),
  module: {
    loaders: packer.client.getLoaders()
  },

  plugins: packer.client.getPlugins()
});

console.log(JSON.stringify(config, null, 2));

module.exports = config;
