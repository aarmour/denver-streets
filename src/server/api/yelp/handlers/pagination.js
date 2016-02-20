'use strict';

const PAGE_SIZE = 10;

module.exports = handlePagination;

function handlePagination(request, reply) {
  const pagination = request.plugins.pagination = {};
  const page = request.query.page || 1;

  pagination.limit = PAGE_SIZE;
  pagination.offset = (PAGE_SIZE * page) - PAGE_SIZE;

  return reply.continue();
}
