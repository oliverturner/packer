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
  appDir:      __dirname + '/src/apps',
  srcs:        {
    sass: __dirname + '/src/sass',
    js:   __dirname + '/src/apps'
  },
  urls:        {
    js:  'scripts',
    css: 'styles'
  }
});

var config = packer.client.create({
  entry:  packer.client.getNestedEntries(),
  //entry:  [__dirname + '/src/apps/home/entry.jsx'],
  output: packer.client.getOutput({
    path: __dirname + '/out'
  })
});

console.log(JSON.stringify(config, null, 2));

module.exports = config;
