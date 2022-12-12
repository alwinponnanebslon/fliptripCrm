import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const firebaseConfig = {
    apiKey: "AIzaSyDoQTQC-zFa0qDu3oG1-Mjq_3fYCJ-8xiQ",
    authDomain: "fliptrip-1ee13.firebaseapp.com",
    projectId: "fliptrip-1ee13",
    storageBucket: "fliptrip-1ee13.appspot.com",
    messagingSenderId: "566071304600",
    appId: "1:566071304600:web:e06a1c23966ca0769c8bed"
};
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
console.log(messaging)
export const fetchToken = (setTokenFound) => {
    return getToken(messaging, { vapidKey: "BI5VtDHqwFJOI_7FIhIRY7qi2IGWrfmUAYm0gipid_JLYMsFCBD5-thePeVzRC36Ia9TEDnAnl_L1G5HsB0j2K4" })
        .then((currentToken) => {
            if (currentToken) {
                console.log("current token for client: ", currentToken);
                return currentToken;
                // Track the token -> client mapping, by sending to backend server
                // show on the UI that permission is secured
            } else {
                console.log("No registration token available. Request permission to generate one.");
                // shows on the UI that permission is required
                return null;
            }
        })
        .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
            // catch error while creating client token
            return null;
        });
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
