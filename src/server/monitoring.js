const config = require('./config');
const monitoring = require('good');
const consoleReporter = require('good-console');

const options = {
  opsInterval: config.monitoring.opsInterval,
  reporters: [
    {
      reporter: consoleReporter,
      events: { log: '*', response: '*' }
    }
  ]
};

module.exports = {
  register: monitoring,
  options
};
