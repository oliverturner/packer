import assert from 'assert';

// Fill unsupplied values for output key
/**
 * @param {string} jsUrl
 * @param output {{
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
function getOutput (jsUrl, output) {
  let defaultOutputs = {
    path:          null,
    publicPath:    `/${jsUrl}/`,
    filename:      `${jsUrl}/[name].js`,
    chunkFilename: `${jsUrl}/[name].js`
  };

  return Object.keys(defaultOutputs).reduce((output, key) => {
    output[key] = output[key] || defaultOutputs[key];

    assert(output[key], `output.${key} may not be omitted`);

    return output;
  }, output);
}

export default getOutput;
