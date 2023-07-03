import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";
import { FirebaseConfig } from "./connector/AppConfig.js";

export const firebaseConfig = {
    apiKey: "AIzaSyAvDJNhcHFu045VYVAnFTjmBNkmaDSMWpU",
    authDomain: "mern-stack-ef0e9.firebaseapp.com",
    projectId: "mern-stack-ef0e9",
    storageBucket: "mern-stack-ef0e9.appspot.com",
    messagingSenderId: "611652026877",
    appId: "1:611652026877:web:d25871dccd390b98c15994"
};

// Initialize Firebase
// initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);




export const GetDeviceToken = () => {
    requestPermission()
}


export const Storage = getStorage(app, FirebaseConfig.BucketUrl);

// export const messaging = getMessaging(app);

// getToken(messaging, { vapidKey: 'BIZrWojodZgcZMYOMkBR5VnKrFtc_4nEGx1j6m2BeO9PFyKzb9AfQpNCNwekGp4_HiAkzhR5pQFMvd3oJjxj2E4' })
//     .then((currentToken) => {
//         if (currentToken) {
//             // Send the token to your server and update the UI if necessary
//             console.log("currentToken", currentToken);
//         } else {
//             // Show permission request UI
//             console.log('No registration token available. Request permission to generate one.', currentToken);
//         }
//     }).catch((err) => {
//         console.log('An error occurred while retrieving token. ', err);
//     });

// const requestPermission = async () => {
//     console.log('Requesting permission...');
//     let permission = await Notification.requestPermission();
//     let token = await getToken(messaging, { vapidKey: 'BBc-81v6tuLmbi4qZM-DtwfbAaiFIPbwzOKxKTJCPXkfaHH4wzYzCgumpxMao_a3uiVPIU0KO7VLCzN4nL72M1U' });
//     if (permission && permission === 'granted') {
//         if (token) {
//             console.log("token", token);
//         } else {
//             console.log("con't get token");
//         }

//     } else {
//         console.log("you not allow notifiction");
//     }
// }

export const requestPermission = () => {

    console.log("Requesting User Permission......");
    getToken(getMessaging(), { vapidKey: 'BBc-81v6tuLmbi4qZM-DtwfbAaiFIPbwzOKxKTJCPXkfaHH4wzYzCgumpxMao_a3uiVPIU0KO7VLCzN4nL72M1U' }).then((currentToken) => {
        console.log("currentToken =", currentToken);
        if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // ...
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
    });

}

// requestPermission();


