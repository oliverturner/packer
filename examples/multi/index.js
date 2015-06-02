var Packer = require('../../dist');

var env = process.env.NODE_ENV || 'development';
var isProd = env === 'production';

var appPort = 3000;
var appServer = Packer.utils.getServerOpts({port: appPort});
var devServer = Packer.utils.getServerOpts(appServer.set('port', appPort + 1));

var packer = new Packer({
  isProd:      isProd,
  devServer:   devServer,
  resolveRoot: __dirname + '/src',
  appDir:      __dirname + '/src/js/apps',
  srcs:        {
    js:   __dirname + '/src/js',
    sass: __dirname + '/src/sass'
  },
  urls:        {
    js:  'scripts',
    css: 'styles'
  }
});

var config = packer.client.create({
  // Omitting entry to use default `client.getNestedEntries`
  output: packer.client.getOutput({
    path: __dirname + '/out'
  })
});

console.log(JSON.stringify(config, null, 2));

module.exports = config;
