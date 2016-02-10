'use strict';

require('babel-register');

const path = require('path');
const config = require('./config');
const Server = require('hapi').Server;

const server = new Server();

server.connection({
  host: config.host,
  port: config.port
});

server.register([

  // Development server
  {
    register: require('./development'),
    options: {
      env: config.env,
      webpackConfig: path.resolve(__dirname, '../../webpack.config.js')
    }
  },

  // Process monitoring
  require('./monitoring'),

  // API
  {
    register: require('./api'),
    options: {
      search: { client: require('./elasticsearch') },
      routes: { prefix: '/api' }
    }
  },

  // views
  {
    register: require('./views')
  }

], err => {
  if (err) throw err;

  server.start(() => server.log(`Server running at: ${server.info.uri}`));
});
