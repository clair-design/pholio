module.exports = {
  plugins: ".pholio/plugins",
  layouts: ".pholio/layouts",
  assetPath: ".pholio/static",
  pages: [".pholio/content/**/*.md"],
  output: "docs",
  // fallback page, usually a 404 page or error page
  errorRedirect: "/error",

  // for vue-router
  routerMode: "hash",

  md2vue: {
    gistInjection: ""
  },

  // external links
  // support CSS and JavaScript urls
  externals: [
    "https://lib.baomitu.com/babel-polyfill/6.26.0/polyfill.min.js",
    "https://lib.baomitu.com/fetch/2.0.3/fetch.min.js"
  ],

  useServiceWorker: true
};
