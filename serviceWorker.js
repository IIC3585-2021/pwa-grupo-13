const staticDevCoffee = "dev-coffee-site-v1"
const timeoutWait = 500
const assets = [
  "/",
  "/favicon.ico",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/images/icons/icon-512x512.png",
  "/images/coffee.jpg",
  "/images/eiffel.jpg",
  "/images/starwars.jpg",
  "/images/covid.jpg"
]

self.addEventListener("install", installEvent => {
  console.log("Installing service worker")
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets);
      console.log("assets cached");
    })
  )
})

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset: ' + evt.request.url);
  evt.respondWith(fromNetwork(evt.request, timeoutWait).catch(function () {
    return fromCache(evt.request);
  }));
});

function fromNetwork(request, timeout) {
  return new Promise(function (fulfill, reject) {
    var timeoutId = setTimeout(reject, timeout);
    fetch(request).then(function (response) {
      clearTimeout(timeoutId);
      caches.open(staticDevCoffee).then(cache => {
        cache.put(request, response.clone());
        console.log("assets refreshed");
      })
      .then(refresh(response))
      .then(fulfill(response))
    }, reject);
  });
}

function fromCache(request) {
  return caches.open(staticDevCoffee).then(function(cache) {
    return cache.match(request).then(function(matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function refresh(response) {
  return self.clients.matchAll().then(function (clients) {
    clients.forEach(function (client) {
      var message = {
        type: 'refresh',
        url: response.url,
        eTag: response.headers.get('ETag')
      };
      client.postMessage(JSON.stringify(message));
    });
  });
}