import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// import * as serviceWorker from './sw';

ReactDOM.render(
  <App />,
  document.getElementById('root'))

require('./push-notification').initializeFirebase()

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/src-sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

