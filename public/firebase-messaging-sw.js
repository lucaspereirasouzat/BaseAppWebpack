importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyBcqZLzOCW51CzIW0wTxNRJLDpfiURsPts",
    authDomain: "golangproject-4b9a2.firebaseapp.com",
    databaseURL: "https://golangproject-4b9a2.firebaseio.com",
    projectId: "golangproject-4b9a2",
    storageBucket: "golangproject-4b9a2.appspot.com",
    messagingSenderId: "411225577463",
    appId: "1:411225577463:web:37df55fa108635390ec0f2",
    measurementId: "G-17C5J8BDD8"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();