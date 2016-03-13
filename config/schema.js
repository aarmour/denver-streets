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

  accounts: {
    clientId: {
      documentation: 'Auth0 client ID.',
      format: String,
      env: 'ACCOUNTS_CLIENT_ID',
      default: '80sQnIfh4ujgVixlgAXkgNHqJX7GnkzE'
    },

    clientSecret: {
      documentation: 'Auth0 client secret.',
      format: String,
      env: 'ACCOUNTS_CLIENT_SECRET',
      default: ''
    },

    domain: {
      documentation: 'Auth0 domain.',
      format: String,
      env: 'ACCOUNTS_DOMAIN',
      default: 'denverite.auth0.com'
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
  },

  yelp: {
    consumerKey: {
      documentation: 'Yelp API consumer key.',
      format: String,
      env: 'YELP_CONSUMER_KEY',
      default: ''
    },

    consumerSecret: {
      documentation: 'Yelp API consumer secret.',
      format: String,
      env: 'YELP_CONSUMER_SECRET',
      default: ''
    },

    token: {
      documentation: 'Yelp API token.',
      format: String,
      env: 'YELP_TOKEN',
      default: ''
    },

    tokenSecret: {
      documentation: 'Yelp API token secret.',
      format: String,
      env: 'YELP_TOKEN_SECRET',
      default: ''
    }
  }

};
