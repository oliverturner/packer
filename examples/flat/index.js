var Immutable = require('immutable');

var WebPacker = require('../../dist').default;
var getServerOpts = require('../../dist/utils/getServerOpts');

var isDev     = process.env.NODE_ENV !== 'production';

var server = getServerOpts(Immutable.Map({
  host: 'localhost',
  port: 3001
}));

var entryHost  = isDev ? server.get('url') : null;
var publicPath = isDev ? server.get('url') + '/' : '/';

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
  entry:  refs.srcs.js,
  output: {
    path:       __dirname + '/out',
    publicPath: publicPath
  }
}, refs);

console.log(JSON.stringify(config, null, 2));

module.exports = config;
