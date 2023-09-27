"use strict";

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Register the service worker
        navigator.serviceWorker.register('./sw.js').then(function(registration) {
            registration.addEventListener('updatefound', () => {
                // An updated service worker has appeared in registration.installing!
                newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                    // Has service worker state changed?
                    // There is a new service worker available, show the notification
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        const elementList = document.getElementsByClassName('fade_box');
                        for (const element of elementList) {
                            element.classList.add("hidden");
                        }
                        notificationBox.classList.remove("hidden");
                    }
                });
            });
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log("ServiceWorker registration failed: ", err);
        });
        // The event listener that is fired when the service worker updates
        // Here we reload the page
        navigator.serviceWorker.addEventListener('controllerchange', function () {
            window.location.reload();
        });
    });
}