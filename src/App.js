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
