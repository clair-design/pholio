__jsonpResolve(function(){var e={};e.exports=function(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");return o.type="text/css","top"===n&&r.firstChild?r.insertBefore(o,r.firstChild):r.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e)),function(){r.removeChild(o)}}};return e.exports={render:function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},components:{},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("article",{staticClass:"markdown-body "},[n("p",[e._v("404 NOT FOUND")])])}],mounted:function(){this.cleanup=null},destroyed:function(){this.cleanup&&this.cleanup()}},e.exports.metaInfo=function(){return{title:"出错啦"}},e.exports.computed={$vars:function(){return{}},$page:function(){var t=this.$route.path;return this.$pages.filter(function(e){return e.path===t})[0]||{}}},e.exports}());