module.exports = {

  env: {
    documentation: 'The runtime environment.',
    env: 'NODE_ENV',
    default: 'development'
  },

  configDir: {
    documentation: 'Source directory for environment-specific configuration files.',
    env: 'CONFIG_DIR',
    default: __dirname
  },

  host: {
    documentation: 'The host to bind to.',
    env: 'HOST',
    default: '0.0.0.0'
  },

  port: {
    documentation: 'The port to bind to.',
    format: 'port',
    env: 'PORT',
    default: 9001
  }

};
