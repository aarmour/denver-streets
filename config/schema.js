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
    default: 9000
  },

  monitoring: {
    opsInterval: {
      documentation: 'The interval in milliseconds to sample system and process performance metrics.',
      format: Number,
      env: 'MONITORING_OPS_INTERVAL',
      default: 60000
    }
  },

  elasticsearch: {
    host: {
      documentation: 'Elasticsearch host.',
      format: String,
      env: 'ELASTICSEARCH_HOST',
      default: '192.168.99.100:9200'
    }
  },

  mapbox: {
    accessToken: {
      documentation: 'The MapBox access token.',
      format: String,
      env: 'MAPBOX_ACCESS_TOKEN',
      default: 'pk.eyJ1IjoiYWFybW91ciIsImEiOiJjaWlucjJxNDkwMWVwdmptNWw4Z20xNXpwIn0.SwlGS26RAgqeTK1kD-Xclw'
    }
  }

};
