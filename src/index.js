import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './sw';
import { initializeFirebase } from './push-notification';

ReactDOM.render(
  <App />,
  document.getElementById('root'))

// import runtime from 'serviceworker-webpack-plugin/lib/runtime';

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker.register("/sw.js");
//   })
// }
initializeFirebase()

serviceWorker.register()