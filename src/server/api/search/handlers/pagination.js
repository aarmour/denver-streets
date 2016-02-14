'use strict';

const PAGE_SIZE = 10;

module.exports = handlePagination;

function handlePagination(request, reply) {
  const elasticsearch = request.elasticsearch = {};
  const page = request.query.page || 1;

  elasticsearch.size = PAGE_SIZE;
  elasticsearch.from = (PAGE_SIZE * page) - PAGE_SIZE;

  return reply.continue();
}
