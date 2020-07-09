import firebase from 'firebase';
// import runtime from 'serviceworker-webpack-plugin/lib/runtime';

export const initializeFirebase = () => {

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



    // if ('serviceWorker' in navigator) {
    //     runtime.register().then(registration =>
    //         firebase.messaging().useServiceWorker(registration)
    //     );
    // }

    navigator.serviceWorker
        .register('src-sw.js')
        .then((registration) => {
            console.log(registration);

            firebase.messaging().useServiceWorker(registration);
        }).catch(err => console.log('err', err)
        );
}

export const askForPermissioToReceiveNotifications = async () => {
    try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();
        console.log('token do usuário:', token);
        //alert(token)
        return token;
    } catch (error) {
        console.error(error);
    }
}

// export const ListNotifications = async () => {
//     try {
//         console.log('entrou no list');
//         const messaging = firebase.messaging();
//         console.log(messaging.getToken());

//         let registration = await navigator.serviceWorker.ready
//         console.log('regs', registration);

//         let notifications = await registration.getNotifications()
//         console.log(notifications);



//         // return token;
//     } catch (error) {
//         console.error(error);
//     }
// }
