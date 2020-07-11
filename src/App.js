import React, { memo } from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles'
import './App.css';
import { blue, indigo } from '@material-ui/core/colors'
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import createReducers from "reduxState/index";
import ProtectedRoutes from "components/ProtectedRoutes";
import { Route, BrowserRouter } from 'react-router-dom'

const { store, persistor } = createReducers()

const routes = require('./routes').default;

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '"Lato"',
      'sans-serif'
    ].join(',')
  }
});

// var CACHE_NAME = 'otimigas-app';

// function queryCache() {
//   var url = [];
//   caches.open('mycache').then(function (cache) {
//     cache.keys().then(function (keys) {
//       return Promise.all(
//         keys.map(function (k) { url.push(k.url); return k.url })
//       )
//     }).then(function (u) { cacheList(url); })
//   })
// }

// self.addEventListener('install', async function (event) {
//   let urlsToCache = await queryCache()
//   // Perform install steps
//   event.waitUntil(
//     caches.open(urlsToCache)
//       .then(function (cache) {
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// self.addEventListener('fetch', function (event) {
//   event.respondWith(
//     caches.match(event.request)
//       .then(function (response) {
//         // Cache hit - return response
//         if (response) {
//           return response;
//         }
//         return fetch(event.request);
//       }
//       )
//   );
// });


const App = memo(_ => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider theme={theme}>

        <BrowserRouter>
          {routes.map(({ id, secure, ...value }) => secure ?
            <ProtectedRoutes key={id} {...value} /> :
            <Route exact key={id} {...value} />
          )}
        </BrowserRouter>

      </ThemeProvider>
    </PersistGate>
  </Provider>
), false)

export default App;
