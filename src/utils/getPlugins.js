import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Return an environment-specific array of plugins
/**
 * @param {bool} isProd
 * @param definitions {{
 *   process[env]: {
 *     NODE_ENV: string
 *   }
 * }}
 * @param urls {{
 *   css: string
 *   js: string
 * }}
 * @returns {Array.<T>}
 */
function getPlugins (isProd, definitions, urls) {
  let commonsChunk = new webpack.optimize.CommonsChunkPlugin('commons', `${urls.js}/commons.js`);

  let defaults = [
    new webpack.DefinePlugin(definitions)
  ];

  let development = [
    commonsChunk,
    new webpack.HotModuleReplacementPlugin()
  ];

  let production = [
    commonsChunk,
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin(`${urls.css}/[name].css`, {
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
