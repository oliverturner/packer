var WebPacker = require('../dist').default;
var extractEntries = require('../dist/utils/extractEntries');

var refs = {
  paths: {sass: './sass'}
};

var config = new WebPacker({
  entry: extractEntries(true, 'http://localhost:3001', __dirname + '/apps')
}, refs);

console.log(JSON.stringify(config, null, 2));
