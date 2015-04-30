var webpacker = require('../');

var config = webpacker({}, {sass: './sass'});

console.log(JSON.stringify(config, null, 2));
