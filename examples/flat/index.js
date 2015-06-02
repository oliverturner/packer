var Packer        = require('../../dist');
var getEntries    = require('../../dist/utils/getEntries').getEntries;
var getServerOpts = require('../../dist/utils/getServerOpts');

var isProd    = process.env.NODE_ENV === 'production';
var appPort   = 3000;
var appServer = getServerOpts({port: appPort});
var devServer = getServerOpts(appServer.set('port', appPort + 1));

var srcs = {
  sass: __dirname + '/src/sass',
  js:   __dirname + '/src/apps'
};

var packer = new Packer({
  isProd:      isProd,
  devServer:   devServer,
  appDir:      srcs.js,
  resolveRoot: __dirname + '/src',
  srcs:        srcs,
  urls:        {
    js:  'scripts',
    css: 'styles'
  }
});

var config = packer.client.create({
  entry:  packer.client.getEntries(),
  output: packer.client.getOutput({
    path: __dirname + '/out'
  })
});

console.log(JSON.stringify(config, null, 2));

module.exports = config;
