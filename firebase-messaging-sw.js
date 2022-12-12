// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

// Initialize the Firebase app in the service worker by passing the generated config


const firebaseConfig = {
    apiKey: "AIzaSyDoQTQC-zFa0qDu3oG1-Mjq_3fYCJ-8xiQ",
    authDomain: "fliptrip-1ee13.firebaseapp.com",
    projectId: "fliptrip-1ee13",
    storageBucket: "fliptrip-1ee13.appspot.com",
    messagingSenderId: "566071304600",
    appId: "1:566071304600:web:e06a1c23966ca0769c8bed"
};
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
