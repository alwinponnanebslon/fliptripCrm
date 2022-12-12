export const registerServiceWorker = () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("/public/firebase-messaging-sw.js")
            .then(function (registration) {
                // eslint-disable-next-line no-console
                console.log("[SW]: SCOPE: ", registration);
                return registration.scope;
            })
            .catch(function (err) {
                return err;
            });
    }
};
