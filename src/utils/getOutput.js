import assert from 'assert';

// Fill unsupplied values for output key
/**
 * @param {string} jsUrl
 * @param options {{
 *   path:          string,
 *   publicPath:    string,
 *   filename:      string,
 *   chunkFilename: string
 * }}
 *
 * @returns {{
 *   path:          string,
 *   publicPath:    string,
 *   filename:      string,
 *   chunkFilename: string
 * }}
 */
function getOutput (jsUrl, options) {
  assert(jsUrl, `jsUrl may not be omitted`);

  let defaults = {
    path:          null,
    publicPath:    '/',
    filename:      `${jsUrl}/[name].js`,
    chunkFilename: `${jsUrl}/[name].js`
  };

  // TODO: use Map.merge
  return Object.keys(defaults).reduce((output, key) => {
    output[key] = output[key] || defaults[key];

    assert(output[key], `options.${key} may not be omitted`);

    return output;
  }, options);
}

export default getOutput;
