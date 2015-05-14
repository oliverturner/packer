import {Map} from 'immutable'

const requiredKeys = ['host', 'port'];

// `options` is an immutable map
// See [ImmutableJS](https://facebook.github.io/immutable-js/) for details
/**
 * @param options {{
 *   host: string,
 *   port: int
 *   url:  [string]
 * }}
 */
function getServerOpts (options) {
  if(!Map.isMap(options)) {
    throw new Error('options must be an instance of Immutable Map');
  }

  requiredKeys.forEach(key => {
    if (!options.get(key)) {
      throw new Error(`Missing value for options.${key}`);
    }
  });

  options = options.set('url', `http://${options.host}:${options.port}`);

  return options;
}

export default getServerOpts;
