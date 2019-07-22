# What is this?

A local development setup that doesn't install NodeJS, Webpack, npm or other tools.

```
# exectutes `python -m SimpleHTTPServer 8000`
./run.sh
```

## Goals

- No install or build step
- Load all dependencies from [jspm.io](https://jspm.io/)
- Centralize all 3p imports in `./depts.js` (inipired by [Deno](https://deno.land/))
- Target modern browsers, don't transpile ES6 features
- Transpile jsx using Babel in a service worker

# Credits

Inspired by [Unchained](https://github.com/edoardocavazza/unchained), [Babel-service](https://github.com/bahmutov/babel-service) and [Deno](https://deno.land/)

# Todo

- Cache the Babel transformations in the service worker
- Explore [import maps](https://chromestatus.com/feature/5315286962012160)
- Use rollup for production bundling
