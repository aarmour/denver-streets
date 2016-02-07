const config = require('./config');
const Client = require('elasticsearch').Client;

module.exports = new Client({ host: config.elasticsearch.host });
