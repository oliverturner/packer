import assert from 'assert';
import { Map } from 'immutable';

const requiredKeys = ['host', 'port'];

// `options` is coverted to an immutable map
// See [ImmutableJS](https://facebook.github.io/immutable-js/) for details
/**
 * @param {Map|{}} options {{
 *   host: string,
 *   port: int
 * }}
 *
 * @returns {Map}
 */
function getServerOpts (options) {
  assert(options, 'options must be supplied');

  options = Map.isMap(options) ? options : Map(options);

  requiredKeys.forEach(key =>
    assert(options.get(key), `Missing value for options.${key}`)
  );

  options = options.set('url', `http://${options.get('host')}:${options.get('port')}`);

  return options;
}

export default getServerOpts;
