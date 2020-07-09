import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// import * as serviceWorker from './sw';
import { initializeFirebase } from './push-notification';

ReactDOM.render(
  <App />,
  document.getElementById('root'))

initializeFirebase()

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}