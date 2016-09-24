const config = require('./webpack.config');

config.devtool = 'source-map';
config.output.path = __dirname + '/sample';

module.exports = config;
