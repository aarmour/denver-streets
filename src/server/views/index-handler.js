import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import configureStore from '../../common/store/configureStore';
import App from '../../common/containers/App';

module.exports = indexHandler;

function indexHandler(request, reply) {
  // TODO: fetch initial state

  const initialState = {};
  const store = configureStore(initialState);

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  return reply(renderFullPage(html, initialState));
}

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `;
}
