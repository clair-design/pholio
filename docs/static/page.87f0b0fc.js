__jsonpResolve(function(){var e={};e.exports=function(e,t){void 0===t&&(t={});var r=t.insertAt;if(e&&"undefined"!=typeof document){var n=document.head||document.getElementsByTagName("head")[0],s=document.createElement("style");return s.type="text/css","top"===r&&n.firstChild?n.insertBefore(s,n.firstChild):n.appendChild(s),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(document.createTextNode(e)),function(){n.removeChild(s)}}};return e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("article",{staticClass:"markdown-body"},[r("h1",[e._v("Pholio")]),e._v(" "),r("p",[r("github-badge")],1),e._v(" "),e._m(0),e._v(" "),r("p"),e._v(" "),e._m(1),e._v(" "),r("h2",{attrs:{id:"shuo-ming"}},[e._v("说明")]),e._v(" "),e._m(2),e._v(" "),r("p",[e._v("在开发 Vue 相关的 UI Libarary 时，pholio 能让你做到 —— 在写 Component 的同时")]),e._v(" "),e._m(3),e._v(" "),r("h2",{attrs:{id:"an-zhuang"}},[e._v("安装")]),e._v(" "),e._m(4),e._v(" "),e._m(5),e._v(" "),r("h2",{attrs:{id:"todo"}},[e._v("TODO")]),e._v(" "),e._m(6),e._v(" "),r("h2",{attrs:{id:"zhi-xie"}},[e._v("致谢")]),e._v(" "),e._m(7)])},components:{},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("blockquote",[r("p",[e._v("使用 Markdown 展示可使用、可交互的 Vue 组件")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("blockquote",[r("p",[e._v("用 Markdown 编写你的 storybook")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[r("code",[e._v("pholio")]),e._v(" 这个名字源于 "),r("code",[e._v("portfolio")]),e._v(" 的后半部分。通过 pholio，你可以很方便地编写文档。")])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ul",[r("li",[e._v("把 Demo 写了，即时查看样式、效果")]),e._v(" "),r("li",[e._v("顺带把组件文档写了")]),e._v(" "),r("li",[e._v("接着文档网站给生成了")]),e._v(" "),r("li",[e._v("使用 Vue SSR 技术生成 SEO 友好 的静态文档（支持 Service Worker）")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("p",[r("strong",[e._v("不建议全局安装。")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("pre",{pre:!0},[r("code",{pre:!0,attrs:{class:"hljs language-shell"}},[r("span",{pre:!0,attrs:{class:"hljs-meta"}},[e._v("$")]),r("span",{pre:!0,attrs:{class:"bash"}},[e._v(" npm install --save-dev pholio "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("# for npm users")])]),e._v("\n"),r("span",{pre:!0,attrs:{class:"hljs-meta"}},[e._v("$")]),r("span",{pre:!0,attrs:{class:"bash"}},[e._v(" yarn add --dev pholio "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[e._v("# for yarn users")])]),e._v("\n")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ul",[r("li",[e._v("加入 PWA 的支持")]),e._v(" "),r("li",[e._v("更合理地拆分文件")])])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ul",[r("li",[r("p",[r("a",{attrs:{href:"https://github.com/egoist/bili",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("bili")])])]),e._v(" "),r("li",[r("p",[r("a",{attrs:{href:"https://github.com/AngusFu/md2vue/",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("md2vue")])])]),e._v(" "),r("li",[r("p",[r("a",{attrs:{href:"https://github.com/remarkjs/",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("remarkjs")])])]),e._v(" "),r("li",[r("p",[r("a",{attrs:{href:"https://github.com/rstacruz/nprogress/",target:"_blank",rel:"nofollow noopener noreferrer"}},[e._v("nprogress")])])])])}],mounted:function(){this.cleanup=null},destroyed:function(){this.cleanup&&this.cleanup()}},e.exports.metaInfo=function(){return{title:"首页"}},e.exports.computed={$vars:function(){return{}},$page:function(){var t=this.$route.path;return this.$pages.filter(function(e){return e.path===t})[0]||{}}},e.exports}());