// import babel standalone from unpkg
// https://babeljs.io/docs/en/babel-standalone
importScripts("https://unpkg.com/@babel/standalone@7.5.5/babel.min.js");

// promptly activate the ServiceWorker.
self.addEventListener("install", event => {
  console.log("installing service worker");
  event.waitUntil(self.skipWaiting()); // Activate worker immediately
});

self.addEventListener("activate", event => {
  console.log("activating service worker");
  event.waitUntil(self.clients.claim()); // Become available to all pages
});

// intercept fetch events.
self.addEventListener("fetch", event => {
  // only intercept scripts
  if (event.request.destination !== "script") {
    console.log("not js", event.request.destination);
    return;
  }

  // ignore 3ps
  // todo: cache requests to jspm.io
  if (!event.request.url.startsWith(self.location.origin)) {
    console.log("3p", event.request.url);
    return;
  }

  const { pathname } = new URL(event.request.url);
  if (pathname === "/src/index.js") {
    console.log("ignore index.js because babel can't parse dynamic imports");
    return;
  }

  event.respondWith(
    (async function() {
      let response = await fetch(event.request);
      let content = await response.clone().text();
      let transformed = Babel.transform(content, { presets: ["react"] }).code;
      let finalResponse = new Response(transformed, {
        headers: {
          // save the original ETag header for cache.
          ETag: response.headers.get("ETag"),
          // force Content-type to javascript.
          "Content-Type": "text/javascript"
        }
      });

      return finalResponse;
    })()
  );
});
