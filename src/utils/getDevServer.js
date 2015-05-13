function getDevServer (port, host = 'localhost') {
  let url;

  url  = `http://${host}:${port}`;

  return {host, port, url};
}

export default getDevServer;
