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
  const { accounts, mapbox } = this;

  match({ routes, location: request.url }, (error, redirectLocation, renderProps) => {
    if (error) return reply(error);
    if (redirectLocation) return reply.redirect(redirectLocation.pathname + redirectLocation.search);

    const html = renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );

    const initialState = store.getState();

    return reply(renderFullPage(html, { accounts, mapbox, initialState }));
  });
}

function renderFullPage(html, data) {
  return `
    <!doctype html>
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" rel="stylesheet">

        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

        <style>
          ${styles.inline}
        </style>

        <link href="/static/${styles.external['main.css']}" rel="stylesheet">
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__ACCOUNTS__ = ${JSON.stringify(data.accounts)};
          window.__MAPBOX__ = ${JSON.stringify(data.mapbox)};
          window.__INITIAL_STATE__ = ${JSON.stringify(data.initialState)};
        </script>
        <script src="//cdn.auth0.com/js/lock-8.2.min.js"></script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `;
}
