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
    "url": "static/framework.86cd1c06.js",
    "revision": "14bff249dc267fd4b436e263d846b490"
  },
  {
    "url": "static/manifest.69930d35.js",
    "revision": "e96fd52eb4baf5a8d96acfb7a04a1646"
  },
  {
    "url": "static/page.28f3e54a.js",
    "revision": "e61062e25fe28047cbb26b60794db101"
  },
  {
    "url": "static/page.3a3a1748.js",
    "revision": "715048a5bbdf1439d27b9da80d3c3820"
  },
  {
    "url": "static/page.43133274.js",
    "revision": "9faab11f2f6277d0a71aaa7f1cea18a0"
  },
  {
    "url": "static/page.ae21cf8e.js",
    "revision": "ddac41a052634c558b95b42f327e50b2"
  },
  {
    "url": "static/styles.46e69b49.css",
    "revision": "172f27e0a6776d1951f2b4b3f48b147e"
  },
  {
    "url": "static/vendor.63cb8429.js",
    "revision": "628cd41145e3c224e10030b8e65a58bb"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
