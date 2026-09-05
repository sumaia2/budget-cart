// Offline cache + auto-update.
// The page (index.html) is fetched network-first so a freshly deployed version
// shows up on the next launch; when offline we fall back to the cached copy.
// Other same-origin files use stale-while-revalidate. The photo-to-price reader
// (Tesseract.js) loads from a CDN and needs a connection the first time; the
// calculator + budget tracking work fully offline.
const CACHE = "budget-cart-v2";
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

  const isHTML =
    e.request.mode === "navigate" ||
    url.pathname.endsWith("/") ||
    url.pathname.endsWith("index.html");

  if (isHTML) {
    // Network-first: always try for the latest page; cache it; fall back offline.
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put("./index.html", copy)).catch(() => {});
          return res;
        })
        .catch(() =>
          caches.match(e.request).then((hit) => hit || caches.match("./index.html"))
        )
    );
    return;
  }

  // Everything else same-origin: serve cache fast, refresh it in the background.
  e.respondWith(
    caches.match(e.request).then((hit) => {
      const net = fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
          return res;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});
