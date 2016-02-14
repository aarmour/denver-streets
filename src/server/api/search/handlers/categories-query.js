'use strict';

exports.view = function (request, reply) {
  const from = request.elasticsearch.from;
  const size = request.elasticsearch.size;

  const params = {
    body: {
      query: {
        match: {
          _all: {
            query: request.params.query
          }
        }
      },
      filter: {
        term: {
          category: request.params.category
        }
      },
      from,
      size
    }
  };

  this.client.search(params)
    .then(body => reply(body))
    .catch(error => reply(error));
};
