const requiredKeys = ['host', 'port'];

// `options` is an immutable map
// See [ImmutableJS](https://facebook.github.io/immutable-js/) for details
/**
 * @param {Map} options {{
 *   host: string,
 *   port: int
 *   url:  [string]
 * }}
 *
 * @returns {Map}
 */
function getServerOpts (options) {
  if (!Map.isMap(options)) {
    throw new Error('options must be an instance of Immutable Map');
  }

  requiredKeys.forEach(key => {
    if (!options.get(key)) {
      throw new Error(`Missing value for options.${key}`);
    }
  });

  options = options.set('url', `http://${options.get('host')}:${options.get('port')}`);

  return options;
}

export default getServerOpts;
