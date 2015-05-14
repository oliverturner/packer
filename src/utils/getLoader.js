function getLoader (loader) {
  let parts, module, suffix, splitter;

  parts    = loader.split('?');
  module   = parts[0];
  suffix   = parts[1] || '';
  splitter = suffix.length ? '?' : '';

  return `${module}-loader${splitter}${suffix}`;
}

export default getLoader;
