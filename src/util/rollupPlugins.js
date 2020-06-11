const { resolve } = require("path");
const vue = require("rollup-plugin-vue");
const buble = require("rollup-plugin-buble");
const alias = require("rollup-plugin-alias");
const cjs = require("rollup-plugin-commonjs");
const replace = require("rollup-plugin-replace");
const nodeResolve = require("rollup-plugin-node-resolve");
const requireContext = require("rollup-plugin-require-context");
const postcss = require("rollup-plugin-postcss");
const { terser } = require("rollup-plugin-terser");

module.exports = function({ extract, onExtract, compress }) {
  const npmPrefix = process.env.NPM_PREFIX;
  const abs = path => resolve(npmPrefix, path);
  const { resolveAlias = {} } = require(abs("package.json"));

  Object.keys(resolveAlias).forEach(key => {
    resolveAlias[key] = abs(resolveAlias[key]);
  });
  return [
    postcss({
      extract,
      onExtract
      // onExtract(getExtracted) {
      //   if (extract && extractPath) {
      //     require('fs')
      //   }
      //   return false;
      // }
    }),
    requireContext(),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    alias({
      // SEE https://github.com/rollup/rollup-plugin-alias/issues/26
      resolve: [".js", ".json", ".vue", "/index.js", "/index.vue"],
      vue: abs("node_modules/vue/dist/vue.esm.js"),
      ...resolveAlias
    }),
    vue({
      css: false,
      vue: {
        // fix: vue buble issue
        transforms: null
      }
    }),
    cjs(),
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true,
      extensions: [".js", ".json", ".vue"]
    }),
    buble({
      objectAssign: "Object.assign",
      // SEE https://github.com/Rich-Harris/buble/issues/175
      exclude: [abs("node_modules/vue/dist/vue.esm.js")]
    }),
    compress ? terser() : {}
  ];
};
