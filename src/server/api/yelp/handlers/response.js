'use strict';

const url = require('url');
const clone = require('lodash.clonedeep');
const merge = require('lodash.merge');
const unset = require('lodash.unset');

module.exports = handleResponse;

function formatUrl(urlObj, newProps, removeProps) {
  if (!Array.isArray(removeProps)) removeProps = [];
  removeProps = ['search', ...removeProps];
  urlObj = clone(urlObj);
  merge(urlObj, newProps);

  removeProps.forEach(prop => unset(urlObj, prop));

  return url.format(urlObj);
}

function hasNext(currentPage, total, pageSize) {
  return (total - (pageSize * (currentPage - 1))) > pageSize;
}

function hasPrev(currentPage) {
  return currentPage > 1;
}

function getLinks(requestUrl, pageSize, total) {
  const links = {};
  const currentPage = parseInt(requestUrl.query.page) || 1;

  links.self = formatUrl(requestUrl);

  if (hasNext(currentPage, total, pageSize)) {
    const nextPage = currentPage + 1;

    links.next = formatUrl(requestUrl, { query: { page: nextPage } });
  }

  if (hasPrev(currentPage)) {
    const prevPage = currentPage - 1;

    if (prevPage > 1) {
      links.prev = formatUrl(requestUrl, { query: { page: prevPage } });
    } else {
      links.prev = formatUrl(requestUrl, {}, ['query.page']);
    }
  }

  return links;
}

function handleResponse(request, reply) {
  if (request.response instanceof Error) {
    return reply.continue();
  }

  const response = request.response.source;
  const pagination = request.plugins.pagination;

  response.links = getLinks(request.url, pagination.limit, response.total);

  return reply.continue();
}
