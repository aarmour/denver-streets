'use strict';

const Boom = require('boom');

const DEFAULT_LOCATION = '39.7392,-104.9848';

exports.view = function (request, reply) {
  const params = {
    term: request.params.query,
    limit: request.plugins.pagination.limit,
    offset: request.plugins.pagination.offset
  };

  if (request.params.bbox) {
    params.bounds = request.params.bbox;
  } else {
    params.ll = DEFAULT_LOCATION;
  }

  this.client.search(params)
    .then(body => reply(body))
    .catch(error => reply(Boom.badImplementation(error)));
};
