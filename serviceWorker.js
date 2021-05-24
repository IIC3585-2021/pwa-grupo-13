const staticDevCoffee = "dev-coffee-site-v1"
const assets = [
  // "/",
  // "/index.html",
  // "/css/style.css",
  // "/js/app.js",
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
      console.log("caching assets");
      cache.addAll(assets);
    })
  )
})

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.' + evt);
  evt.respondWith(fromCache(evt.request));
});

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}