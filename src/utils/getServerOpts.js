import { Map } from 'immutable';

import validateOpts from '../utils/validateOpts';

const requiredKeys = {
  host: {type: 'string'},
  port: {type: 'number'},
  url:  {type: 'string'}
};

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
  let defaults = Map({
    host: 'localhost'
  });

  options = Map.isMap(options) ? options : Map(options);
  options = defaults.merge(options);
  options = options.set('url', `http://${options.get('host')}:${options.get('port')}/`);

  return validateOpts(requiredKeys, options);
}

export default getServerOpts;
