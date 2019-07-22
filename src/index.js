function waitForSwRegistration(registration) {
  return new Promise(resolve => {
    let installing = registration.installing || registration.waiting;
    if (installing) {
      installing.addEventListener("statechange", () => {
        if (installing.state === "activated") {
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
}

async function registerServiceWorker(path, options) {
  let registration = await navigator.serviceWorker.register(path, options);
  return waitForSwRegistration(registration);
}

async function setup() {
  await registerServiceWorker("/sw.js", { scope: "/" });
  await import("./main.js");
}

setup().catch(err => console.error(err, err.stack));
