const requiredKeys = [host, port];

/**
 * @param {} options {{
 *   host: string,
 *   port: int
 *   url:  [string]
 * }}
 */
export default function (options) {
  requiredKeys.forEach(key => {
    if(!options[key]) {
      throw new Error(`Missing value for options.${key}`);
    }
  });

  options.url  = `http://${options.host}:${options.port}`;

  return options;
}
