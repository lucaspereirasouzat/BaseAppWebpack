import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { initializeFirebase } from './push-notification';

ReactDOM.render(
  <App />,
  document.getElementById('root'))

initializeFirebase()

serviceWorker.register()