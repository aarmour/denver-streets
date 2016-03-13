'use strict';

exports.view = function (request, reply) {
  const query = request.params.query;

  this.mapboxClient.geocodeForward(query, (error, geocodeResponse) => {
    reply(geocodeResponse);
  });
};
