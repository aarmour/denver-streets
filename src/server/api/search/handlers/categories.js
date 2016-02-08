'use strict';

exports.view = function (request, reply) {
  const params = {
    body: {
      query: {
        match: {
          category: request.params.category
        }
      }
    }
  };

  this.client.search(params)
    .then(body => reply(body))
    .catch(error => reply(error));
};
