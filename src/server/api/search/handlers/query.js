exports.view = function (request, reply) {
  this.client.search({ q: request.params.query })
    .then(body => {
      return reply(body);
    });
};
