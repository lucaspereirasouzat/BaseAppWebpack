import firebase from 'firebase';
// import runtime from 'serviceworker-webpack-plugin/lib/runtime';

export const initializeFirebase = () => {

    const firebaseConfig = {
        apiKey: process.env.APIKEY,
        authDomain: process.env.AUTHDOMAIN,
        databaseURL: process.env.DATABASEURL,
        projectId: process.env.PROJECTID,
        storageBucket: process.env.STORAGEBUCKET,
        messagingSenderId: process.env.MESSAGINGSENDERID,
        appId: process.env.APPID,
        measurementId: process.env.MEASUREMENTID
    };
    firebase.initializeApp(firebaseConfig);


    navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
            firebase.messaging().useServiceWorker(registration);
            console.log("registrou")
        }).catch(err => console.log('err in register', err)
        );
}

export const askForPermissioToReceiveNotifications = async () => {
    try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();

        // const messaging = firebase.messaging();
        // console.log(messaging)
        messaging.onMessage(payload => {
            console.log('[firebase-messaging-sw.js] Received background message ', payload);
        })
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
