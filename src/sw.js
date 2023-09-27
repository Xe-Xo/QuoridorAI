"use strict";

/* 
* A service worker is required for an webpage (or web app) to keep cache
* so that the webpage can be loaded without an internet connection
* if the cache was once saved on the local device.
*
* This service worker script alomost copied from:
* https://developers.google.com/web/fundamentals/primers/service-workers/
*/


const CACHE_NAME = 'blablabhahghjabkjahjgb'

const urlsToCache = [
    './',
    './style.css',
    './js/model.js',
    './js/view.js',
    './js/controller,js'
];


// https://developer.chrome.com/docs/workbox/service-worker-lifecycle/
// on install event add the urls to cache. check with remote server first with "no-cache"
self.addEventListener('install', function(event) {
    event.waitUntil(caches.open(CACHE_NAME).then(function(cache){
        return cache.addAll(urlsToCache.map(function(url){
            return new Request(url, {cache: "no-cache"})
        }))
    }))
});


//Cache found - return response
self.addEventListener('fetch', function(event) {
    event.respondWith(
        cache.match(event.request).then(function(response){
            if(response){
                return response;
            }

            return fetch(event.request);
        })
    )
});

//https://developer.chrome.com/docs/workbox/service-worker-lifecycle/#activation-1
self.addEventListener('activate', function(event) {

    //Specify allowed cache keys
    let cacheWhitelist = [CACHE_NAME];
    
    
    // Get all the currently active Cache instances
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            // Delete all caches that are not on the allow list
            return Promise.all(cacheNames.map(function(cacheName) {
                if(!cacheWhitelist.includes(cacheName)){
                    return caches.delete(cacheName)
                }
            }))
        })
    )
});

self.addEventListener('message', function(event) {
    if(event.data.action === 'skipWaiting'){
        self.skipWaiting();
    }
});
