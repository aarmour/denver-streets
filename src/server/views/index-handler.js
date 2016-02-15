import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import styles from './styles';
import configureStore from '../../common/store/configureStore';
import routes from '../../common/routes';

module.exports = indexHandler;

function indexHandler(request, reply) {
  const store = configureStore();
  const { mapbox } = this;

  match({ routes, location: request.url }, (error, redirectLocation, renderProps) => {
    if (error) return reply(error);
    if (redirectLocation) return reply.redirect(redirectLocation.pathname + redirectLocation.search);

    const html = renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );

    const initialState = store.getState();

    return reply(renderFullPage(html, { mapbox, initialState }));
  });
}

function renderFullPage(html, data) {
  return `
    <!doctype html>
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">

        <style>
          ${styles}
        </style>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__MAPBOX__ = ${JSON.stringify(data.mapbox)};
          window.__INITIAL_STATE__ = ${JSON.stringify(data.initialState)};
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `;
}
