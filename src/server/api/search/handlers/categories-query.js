'use strict';

exports.view = function (request, reply) {
  this.client.search({
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
  })
    .then(body => reply(body));
};
