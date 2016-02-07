'use strict';

const config = require('./config');
const Server = require('hapi').Server;

const server = new Server();

server.connection({
  host: config.host,
  port: config.port
});

server.register([
  require('./monitoring')
], err => {
  if (err) throw err;
  
  server.start(() => server.log(`Server running at: ${server.info.uri}`));
});
