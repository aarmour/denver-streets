'use strict';

exports.view = function (request, reply) {
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
      }
    }
  };

  this.client.search(params)
    .then(body => reply(body))
    .catch(error => reply(error));
};
