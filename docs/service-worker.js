/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "static/framework.a0ce3e34.js",
    "revision": "778aba9ffcf2872eecd269794f7748ba"
  },
  {
    "url": "static/manifest.69930d35.js",
    "revision": "e96fd52eb4baf5a8d96acfb7a04a1646"
  },
  {
    "url": "static/page.28f3e54a.js",
    "revision": "5044e3dda1867af319a9f8870f50fcc6"
  },
  {
    "url": "static/page.3a3a1748.js",
    "revision": "cd669856abb0da3fcf939277d9ffe99a"
  },
  {
    "url": "static/page.43133274.js",
    "revision": "41b9aad6f9dc03f70234c2e01232881b"
  },
  {
    "url": "static/page.ae21cf8e.js",
    "revision": "d95af5322a4927d4a00202aafca18225"
  },
  {
    "url": "static/styles.46e69b49.css",
    "revision": "172f27e0a6776d1951f2b4b3f48b147e"
  },
  {
    "url": "static/vendor.634f3598.js",
    "revision": "527fe12b4b4a9ef08cda1cf2c03e92d0"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
