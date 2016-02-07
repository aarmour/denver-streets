'use strict';

exports.view = function (request, reply) {
  this.client.search({
    body: {
      query: {
        bool: {
          must: {
            term: { category: request.params.category }
          },
          should: [
            {
              match: { _all: request.params.query }
            }
          ]
        }
      }
    }
  })
    .then(body => reply(body));
};
