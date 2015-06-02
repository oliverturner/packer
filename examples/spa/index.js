var Packer = require('../../dist');

var env = process.env.NODE_ENV || 'development';
var isProd = env === 'production';
var devServer = Packer.utils.getServerOpts({port: 3001});

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
  entry:  packer.client.getEntries('.js'),
  output: packer.client.getOutput({
    path: __dirname + '/out'
  })
});

console.log(JSON.stringify(config, null, 2));

module.exports = config;
