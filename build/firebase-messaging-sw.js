// // Scripts for firebase and firebase messaging
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// // Initialize the Firebase app in the service worker by passing the generated config
// var firebaseConfig = {
//     apiKey: "AIzaSyAvDJNhcHFu045VYVAnFTjmBNkmaDSMWpU",
//     authDomain: "mern-stack-ef0e9.firebaseapp.com",
//     projectId: "mern-stack-ef0e9",
//     storageBucket: "mern-stack-ef0e9.appspot.com",
//     messagingSenderId: "611652026877",
//     appId: "1:611652026877:web:d25871dccd390b98c15994",
//     BucketUrl: "gs://mern-stack-ef0e9.appspot.com",
// };

// firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//     console.log('Received background message ', payload);

//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//     };

//     self.registration.showNotification(notificationTitle,
//         notificationOptions);
// });