function getDevServer (port, addr = 'localhost') {
  let url;

  url  = `http://${addr}:${port}`;

  return {addr, port, url}
}

export default getDevServer;
