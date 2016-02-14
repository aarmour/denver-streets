'use strict';

const url = require('url');
const clone = require('lodash.clonedeep');

module.exports = handleResponse;

function hasNext(currentPage, total, pageSize) {
  return (total - (pageSize * (currentPage - 1))) > pageSize;
}

function hasPrev(currentPage) {
  return currentPage > 1;
}

function getPathFromUrlObj(urlObj) {
  return url.parse(url.format(urlObj)).path;
}

function getLinks(requestUrl, pageSize, total) {
  requestUrl = clone(requestUrl);

  const links = {};
  const currentPage = parseInt(requestUrl.query.page) || 1;

  requestUrl.search = undefined;

  if (hasNext(currentPage, total, pageSize)) {
    requestUrl.query.page = currentPage + 1;
    links.next = getPathFromUrlObj(requestUrl);
  }

  if (hasPrev(currentPage)) {
    requestUrl.query.page = currentPage - 1;
    links.prev = getPathFromUrlObj(requestUrl);
  }

  return links;
}

function formatElasticsearchResponse(response) {
  const body = {
    total: response.hits.total,
    results: response.hits.hits.map(hit => hit._source)
  };

  return body;
}

function handleResponse(request, reply) {
  if (request.response instanceof Error) {
    return reply.continue();
  }

  const source = request.response.source;
  const body = formatElasticsearchResponse(source);

  body.links = getLinks(request.url, request.elasticsearch.size, source.hits.total);

  return reply(body);
}
