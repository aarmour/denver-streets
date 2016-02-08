'use strict';

exports.view = function (request, reply) {
  const params = { q: request.params.query };

  this.client.search(params)
    .then(body => reply(body))
    .catch(error => reply(error));
};
