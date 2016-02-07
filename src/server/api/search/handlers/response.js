module.exports = responseHandler;

function formatElasticsearchResponse(response) {
  const body = {
    total: response.hits.total,
    results: response.hits.hits.map(hit => hit._source)
  };

  return body;
}

function responseHandler(request, reply) {
  const body = formatElasticsearchResponse(request.response.source);

  return reply(body);
}
