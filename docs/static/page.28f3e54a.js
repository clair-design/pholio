__jsonpResolve(function(){var e={};e.exports=function(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!=typeof document){var r=document.head||document.getElementsByTagName("head")[0],s=document.createElement("style");return s.type="text/css","top"===n&&r.firstChild?r.insertBefore(s,r.firstChild):r.appendChild(s),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(document.createTextNode(e)),function(){r.removeChild(s)}}};return e.exports={render:function(){var e=this.$createElement;this._self._c;return this._m(0)},components:{},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("article",{staticClass:"markdown-body "},[t("p",[this._v("404 NOT FOUND")])])}],mounted:function(){this.cleanup=null},destroyed:function(){this.cleanup&&this.cleanup()}},e.exports.metaInfo=function(){return{title:"出错啦"}},e.exports.computed={$vars:function(){return{}},$page:function(){var e=this.$route.path;return this.$pages.filter((function(t){return t.path===e}))[0]||{}}},e.exports}());