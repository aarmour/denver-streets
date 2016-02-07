'use strict';

exports.view = function (request, reply) {
  this.client.search({
    body: {
      query: {
        match: {
          category: request.params.category
        }
      }
    }
  })
    .then(body => {
      return reply(body);
    });
};
