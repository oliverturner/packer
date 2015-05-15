import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Return an environment-specific array of plugins
/**
 * @param {bool} isProd
 * @param {string} jsUrl
 * @param {string} cssUrl
 * @returns {Array.<T>}
 */
function getPlugins (isProd, jsUrl, cssUrl) {
  let defs = {
    'process.env': {
      NODE_ENV: JSON.stringify(isProd ? 'production' : 'development')
    }
  };

  let commonsChunk = new webpack.optimize.CommonsChunkPlugin('commons', `${jsUrl}/commons.js`);

  let defaults = [
    new webpack.DefinePlugin(defs),
    new webpack.NoErrorsPlugin()
  ];

  let development = [
    commonsChunk,
    new webpack.HotModuleReplacementPlugin()
  ];

  let production = [
    commonsChunk,
    new ExtractTextPlugin(`${cssUrl}/[name].css`, {
      allChunks: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output:   {comments: false},
      compress: {warnings: false}
    })
  ];

  return (isProd)
    ? defaults.concat(production)
    : defaults.concat(development);
}

export default getPlugins;
