// Minimal offline cache so the app opens without a connection once installed.
// Note: the photo-to-price reader (Tesseract.js) is loaded from a CDN and
// needs a connection the first time; the calculator + budget tracking work
// fully offline.
const CACHE = "budget-cart-v1";
const ASSETS = ["./", "./index.html", "./manifest.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // let CDN requests hit the network
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request))
  );
});
