'use strict';

exports.view = function (request, reply) {
  const from = request.elasticsearch.from;
  const size = request.elasticsearch.size;

  const params = {
    q: request.params.query,
    from,
    size
  };

  this.client.search(params)
    .then(body => reply(body))
    .catch(error => reply(error));
};
