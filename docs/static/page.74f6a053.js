__jsonpResolve(function(){var s={},t={epxorts:s},a={};(function(){var t={metaInfo:function(){return{script:[{innerHTML:"console.log('Hello world.')",body:!0}],__dangerouslyDisableSanitizers:["script"],title:"使用 pholio"}},computed:{$vars:function(){return{threeKingdoms:["魏","蜀","吴"],menu:["error","usage"]}},$page:function(){var t=this.$route.path;return this.$pages.filter(function(s){return s.path===t})[0]||{}}},components:{md2vuedemo0:{methods:{clickme:function(){alert("hello")}},render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"vue-demo"},[a("button",{on:{click:function(s){t.clickme()}}},[t._v("click me")])])},staticRenderFns:[],_scopeId:"data-v-029571ac"},md2vuedemo1:{render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"vue-demo"},[t("div",[t("em",[this._v("我的底下并木有源码哟！")])])])}],_scopeId:"data-v-029571ad"},md2vuedemo2:{render:function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"vue-demo"},[a("button",{on:{click:s.$nprogress.start}},[s._v("\n    Start\n  ")]),s._v(" "),a("button",{on:{click:s.$nprogress.done}},[s._v("\n    Done\n  ")])])},staticRenderFns:[]}},render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("article",{staticClass:"markdown-body"},[a("h1",{attrs:{id:"shi3-yong4-pholio"}},[t._v("使用 pholio")]),t._v(" "),a("h2",{attrs:{id:"ming4-ling2-shuo1-ming2"}},[t._v("命令说明")]),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),t._m(5),t._v(" "),a("h2",{attrs:{id:"chuang4-jian4-ni3-de-wen2-dang4-zhuan1-shu3-mu4-lu4"}},[t._v("创建你的文档专属目录")]),t._v(" "),t._m(6),t._v(" "),a("p",[t._v("该文件夹由以下几个子目录构成：")]),t._v(" "),t._m(7),t._v(" "),a("h2",{attrs:{id:"xiang1-guan1-pei4-zhi4-wen2-jian4"}},[t._v("相关配置文件")]),t._v(" "),t._m(8),t._v(" "),t._m(9),t._v(" "),a("h2",{attrs:{id:"bian1-xie3-bu4-ju2-wen2-jian4"}},[t._v("编写布局文件")]),t._v(" "),t._m(10),t._v(" "),a("p",[t._v("以你现在所看的本文档为例，使用的布局大体可以示意如下 ——")]),t._v(" "),t._m(11),t._v(" "),t._m(12),t._v(" "),t._m(13),t._v(" "),a("h2",{attrs:{id:"bian1-xie3-cha1-jian4"}},[t._v("编写插件")]),t._v(" "),t._m(14),t._v(" "),a("p",[t._v("示例如下 —— ")]),t._v(" "),t._m(15),t._v(" "),a("h2",{attrs:{id:"bian1-xie3-yang4-shi4"}},[t._v("编写样式")]),t._v(" "),a("p",[t._v("如前所述，通常 CSS 文件在插件中引入。或者写在布局文件中。")]),t._v(" "),a("p",[t._v("你大概需要以下几样样式：")]),t._v(" "),t._m(16),t._v(" "),t._m(17),t._v(" "),a("h2",{attrs:{id:"markdown-wen2-dang4-bian1-xie3"}},[t._v("Markdown 文档编写")]),t._v(" "),t._m(18),t._v(" "),a("h3",{attrs:{id:"front-matters-ji1-ben3-pei4-zhi4"}},[t._v("Front Matters: 基本配置")]),t._v(" "),a("p",[t._v("每个 Markdown 文档开头需要使用 YAML 配置一些基本信息 —— 又称为“front matter”。其基本格式如下 ——")]),t._v(" "),t._m(19),t._v(" "),t._m(20),t._v(" "),t._m(21),t._v(" "),a("h3",{attrs:{id:"ye4-mian4-nei4-bian4-liang2"}},[t._v("页面内变量")]),t._v(" "),t._m(22),t._v(" "),a("p",[t._v("例如，本文档的相关信息如下：")]),t._v(" "),a("pre",{staticStyle:{"max-height":"200px"}},[t._v(t._s(t.$pages)+"\n")]),t._v(" "),t._m(23),t._v(" "),a("pre",[t._v(t._s(JSON.stringify(t.$page,null,2))+"\n")]),t._v(" "),t._m(24),t._v(" "),t._m(25),t._v(" "),t._m(26),t._v(" "),t._m(27),t._v(" "),a("p",[t._v("展示效果 ——")]),t._v(" "),a("div",{staticStyle:{margin:"10px 40px 30px"}},t._l(t.$vars.threeKingdoms,function(s){return a("em",{key:s},[t._v("\n"+t._s(s)+"\n")])})),t._v(" "),a("h3",{attrs:{id:"ye4-mian4-nei4-biao1-qian1"}},[t._v("页面内标签")]),t._v(" "),t._m(28),t._v(" "),t._m(29),t._v(" "),a("ul",t._l(t.$vars.menu,function(s){return a("li",{key:s.key},[a("router-link",{attrs:{to:s}},[t._v(t._s(s))])],1)})),t._v(" "),a("h2",{attrs:{id:"demo-bian1-xie3"}},[t._v("Demo  编写")]),t._v(" "),t._m(30),t._v(" "),t._m(31),t._v(" "),a("div",{staticClass:"vue-demo-block"},[a("md2vuedemo0"),t._v(" "),t._m(32)],1),t._v(" "),t._m(33),t._v(" "),t._m(34),t._v(" "),a("div",{staticClass:"vue-demo-block vue-demo-block-demo-only"},[a("md2vuedemo1")],1),t._v(" "),a("p",[t._v("其原始代码为 —— ")]),t._v(" "),t._m(35),t._v(" "),t._m(36),t._v(" "),a("h2",{attrs:{id:"qi2-ta1"}},[t._v("其他")]),t._v(" "),t._m(37),t._v(" "),a("div",{staticClass:"vue-demo-block"},[a("md2vuedemo2"),t._v(" "),t._m(38)],1),t._v(" "),t._m(39)])},staticRenderFns:[function(){var s=this.$createElement,t=this._self._c||s;return t("ol",[t("li",[this._v("指定在 3001 端口启动 devServer:")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("pre",{pre:!0,attrs:{class:"lang-shell"}},[t("code",[t("span",{attrs:{class:"hljs-meta"}},[this._v("$")]),t("span",{attrs:{class:"bash"}},[this._v(" PORT=3001 pholio start")])])])},function(){var s=this.$createElement,t=this._self._c||s;return t("ol",{attrs:{start:"2"}},[t("li",[this._v("构建，生成静态文件到磁盘")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0,attrs:{class:"lang-shell"}},[a("code",[a("span",{attrs:{class:"hljs-meta"}},[s._v("#")]),a("span",{attrs:{class:"bash"}},[s._v(" 默认使用 3000 端口")]),s._v("\n"),a("span",{attrs:{class:"hljs-meta"}},[s._v("$")]),a("span",{attrs:{class:"bash"}},[s._v(" pholio build")])])])},function(){var s=this.$createElement,t=this._self._c||s;return t("ol",{attrs:{start:"3"}},[t("li",[this._v("清理缓存文件夹")])])},function(){var s=this.$createElement,t=this._self._c||s;return t("pre",{pre:!0,attrs:{class:"lang-shell"}},[t("code",[t("span",{attrs:{class:"hljs-meta"}},[this._v("$")]),t("span",{attrs:{class:"bash"}},[this._v(" pholio clean")])])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("p",[s._v("首先我们创建你的"),a("strong",[s._v("文档专属目录")]),s._v("，比如就叫 "),a("code",[s._v("pholio")]),s._v("。")])},function(){var s=this.$createElement,t=this._self._c||s;return t("pre",{pre:!0,attrs:{class:"lang-shell"}},[t("code",[this._v("pholio\n├── content  # 可用于存放 Markdown 文件\n├── layouts  # 存放用作布局 `.vue` 文件\n├── plugins  # 存放 JavaScript 插件\n├── static   # 存放静态文件\n└── styles   # 存放一些由插件/Layout 文件引用的样式")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("p",[s._v("接着在"),a("strong",[s._v("项目根目录")]),s._v("下新建 "),a("code",[s._v("pholio.config.js")]),s._v("，相关配置如下 ——")])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0,attrs:{class:"lang-js"}},[a("code",[a("span",{attrs:{class:"hljs-built_in"}},[s._v("module")]),s._v(".exports = {\n  "),a("span",{attrs:{class:"hljs-attr"}},[s._v("plugins")]),s._v(": "),a("span",{attrs:{class:"hljs-string"}},[s._v("'./pholio/plugins'")]),s._v(", \n  "),a("span",{attrs:{class:"hljs-attr"}},[s._v("layouts")]),s._v(": "),a("span",{attrs:{class:"hljs-string"}},[s._v("'./pholio/layouts'")]),s._v(",\n  "),a("span",{attrs:{class:"hljs-attr"}},[s._v("assetPath")]),s._v(": "),a("span",{attrs:{class:"hljs-string"}},[s._v("'./pholio/static'")]),s._v(",\n  "),a("span",{attrs:{class:"hljs-attr"}},[s._v("pages")]),s._v(": ["),a("span",{attrs:{class:"hljs-string"}},[s._v("'./pholio/content/**/*.md'")]),s._v("],\n  "),a("span",{attrs:{class:"hljs-attr"}},[s._v("output")]),s._v(": "),a("span",{attrs:{class:"hljs-string"}},[s._v("'./docs'")]),s._v(",\n\n  "),a("span",{attrs:{class:"hljs-comment"}},[s._v("// fallback 页面路由，通常是 404 页面或错误页面")]),s._v("\n  errorRedirect: "),a("span",{attrs:{class:"hljs-string"}},[s._v("'/404'")]),s._v(",\n\n  "),a("span",{attrs:{class:"hljs-comment"}},[s._v("// for vue-router: hash or history")]),s._v("\n  routerMode: "),a("span",{attrs:{class:"hljs-string"}},[s._v("'hash'")]),s._v(",\n\n  "),a("span",{attrs:{class:"hljs-comment"}},[s._v("// md2vue 配置")]),s._v("\n  md2vue: {\n    "),a("span",{attrs:{class:"hljs-attr"}},[s._v("highlight")]),s._v(": "),a("span",{attrs:{class:"hljs-string"}},[s._v("'highlight.js'")]),s._v(", "),a("span",{attrs:{class:"hljs-comment"}},[s._v("// 配置代码高亮工具")]),s._v("\n    inject: "),a("span",{attrs:{class:"hljs-string"}},[s._v("''")]),s._v(" "),a("span",{attrs:{class:"hljs-comment"}},[s._v("// markdown 中运行的各个 Vue 实例与源码之间可以插入一些自定义内容")]),s._v("\n  },\n\n  "),a("span",{attrs:{class:"hljs-comment"}},[s._v("// 外部资源 通常是单独引入的 CSS/JavaScript")]),s._v("\n  externals: [\n    "),a("span",{attrs:{class:"hljs-string"}},[s._v("'https://lib.baomitu.com/font-awesome/4.7.0/css/font-awesome.min.css'")]),s._v("\n  ]\n}")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("p",[s._v("重点在于 "),a("code",[s._v("router-view")]),s._v(" 的使用。其他东西任由你写，就像正常的 Vue Single File Component 那样，只要在需要显示 Markdown 文档的位置用 "),a("code",[s._v("<router-view />")]),s._v(" 占位即可。")])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0,attrs:{class:"lang-xml"}},[a("code",[a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("wrapper")]),s._v(">")]),s._v("\n  "),a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("navbar")]),s._v(">")]),s._v("\n    "),a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("h1")]),s._v(">")]),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("h1")]),s._v(">")]),s._v("\n    "),a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("links")]),s._v(">")]),s._v("..."),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("links")]),s._v(">")]),s._v("\n  "),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("navbar")]),s._v(">")]),s._v("\n\n  "),a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("content")]),s._v(">")]),s._v("\n    "),a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("router-view")]),s._v(" />")]),s._v("\n  "),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("content")]),s._v(">")]),s._v("\n"),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("wrapper")]),s._v(">")])])])},function(){var s=this.$createElement,t=this._self._c||s;return t("p",[t("strong",[this._v("注意")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ol",[a("li",[s._v("布局文件的文件名就是你将要在 Markdown 文本中标记"),a("code",[s._v("layout")]),s._v("时使用的名称。")]),s._v(" "),a("li",[s._v("depth 为 1，不会递归使用子目录中的文件")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ol",[a("li",[a("code",[s._v("plugins")]),s._v(" 文件下的 "),a("code",[s._v(".js")]),s._v(" 文件将会自动注册")]),s._v(" "),a("li",[s._v("请使用标准的 ES6 import export 语法")]),s._v(" "),a("li",[s._v("每个文件需要使用 "),a("code",[s._v("export default ModuleName")]),s._v(" 的格式对外暴露")]),s._v(" "),a("li",[s._v("每个文件默认暴露的对象，必须包含 "),a("code",[s._v("install")]),s._v(" 方法")]),s._v(" "),a("li",[s._v("请参考 "),a("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/plugins.html"}},[s._v("Vue 的插件写法")])]),s._v(" "),a("li",[s._v("通常 CSS 文件在插件中引入")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0,attrs:{class:"lang-js"}},[a("code",[a("span",{attrs:{class:"hljs-keyword"}},[s._v("import")]),s._v(" MyCustomElement "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("from")]),s._v(" "),a("span",{attrs:{class:"hljs-string"}},[s._v("'/path/to/custom-element'")]),s._v("\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("export")]),s._v(" "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("default")]),s._v(" {\n  install (Vue) {\n    Vue.component("),a("span",{attrs:{class:"hljs-string"}},[s._v("'custom-element'")]),s._v(", MyCustomElement)\n  }\n}")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ol",[a("li",[s._v("根据你选择的代码高亮主题（highlight.js 或 prism），引入或编写相应的样式")]),s._v(" "),a("li",[s._v("引用或编写 Markdown 样式（如 github-markdown-theme 之类）")]),s._v(" "),a("li",[s._v("布局样式及其他自定义样式")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("p",[s._v("建议使用 PostCSS 编写。项目中 PostCSS 配置文件（"),a("code",[s._v("postcss.config.js")]),s._v("等），将自动应用到布局文件以及其他通过 JavaScript 引入的 CSS 文件上来。")])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("p",[a("strong",[s._v("特别注意")]),s._v(" —— 必须保证一定要有一个 "),a("code",[s._v("route")]),s._v(" 值为 "),a("code",[s._v("/")]),s._v(" 或 "),a("code",[s._v("/index")]),s._v(" 的文档存在")])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0,attrs:{class:"lang-yml"}},[a("code",[a("span",{attrs:{class:"hljs-meta"}},[s._v("---")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("title:")]),s._v(" "),a("span",{attrs:{class:"hljs-string"}},[s._v("'页面标题'")]),s._v("    "),a("span",{attrs:{class:"hljs-comment"}},[s._v("# 主要用于HTML中的<title></title>")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("route:")]),s._v(" "),a("span",{attrs:{class:"hljs-string"}},[s._v("'/page/path'")]),s._v(" "),a("span",{attrs:{class:"hljs-comment"}},[s._v("# 本文档对应的 path")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("layout:")]),s._v(" "),a("span",{attrs:{class:"hljs-string"}},[s._v("'default'")]),s._v("   "),a("span",{attrs:{class:"hljs-comment"}},[s._v("# 使用 layouts/default.vue 布局")]),s._v("\n"),a("span",{attrs:{class:"hljs-meta"}},[s._v("---")])])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("p",[s._v("此外，你还可以使用 "),a("code",[s._v("meta")]),s._v(" 字段来写入一些页面级别的 "),a("a",{attrs:{href:"https://github.com/declandewet/vue-meta"}},[s._v("VueMeta")]),s._v(" 配置。")])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0,attrs:{class:"lang-yml"}},[a("code",[a("span",{attrs:{class:"hljs-attr"}},[s._v("meta:")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("  title:")]),s._v(" "),a("span",{attrs:{class:"hljs-string"}},[s._v("Clair")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("  titleTemplate:")]),s._v(" "),a("span",{attrs:{class:"hljs-string"}},[s._v("'%s - Yay!'")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("  htmlAttrs:")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("    amp:")]),s._v(" "),a("span",{attrs:{class:"hljs-string"}},[s._v("undefined")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("  meta:")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("    - hid:")]),s._v(" "),a("span",{attrs:{class:"hljs-string"}},[s._v("description")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("      name:")]),s._v(" "),a("span",{attrs:{class:"hljs-string"}},[s._v("description")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("      content:")]),s._v(" "),a("span",{attrs:{class:"hljs-string"}},[s._v("Hello")]),s._v(" "),a("span",{attrs:{class:"hljs-string"}},[s._v("World")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("  style:")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("    - cssText:")]),s._v(" "),a("span",{attrs:{class:"hljs-string"}},[s._v("''")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("  script:")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("    - innerHTML:")]),s._v(" "),a("span",{attrs:{class:"hljs-string"}},[s._v("console.log('Hello")]),s._v(" "),a("span",{attrs:{class:"hljs-string"}},[s._v("world.')")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("      body:")]),s._v(" "),a("span",{attrs:{class:"hljs-literal"}},[s._v("true")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("  noscript:")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("    - innerHTML:")]),s._v(" "),a("span",{attrs:{class:"hljs-string"}},[s._v("'This website requires JavaScript.'")]),s._v("\n  "),a("span",{attrs:{class:"hljs-comment"}},[s._v("# 注意下面这一行对于脚本来说很重要")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("  __dangerouslyDisableSanitizers:")]),s._v("\n"),a("span",{attrs:{class:"hljs-bullet"}},[s._v("    -")]),s._v(" "),a("span",{attrs:{class:"hljs-string"}},[s._v("script")])])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("p",[s._v("在布局文件（以及 Markdown 文本）中，你可以通过 "),a("code",[s._v("$pages")]),s._v(" 拿到整个站点所有的页面的基本信息，据此可以做一些诸如侧边栏生成之类的工作。（"),a("strong",[s._v("该变量在布局文件中也能拿到")]),s._v("）")])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("p",[s._v("通过 "),a("code",[s._v("$page")]),s._v(" 可以拿到当前文档的基本配置信息（title、layout、route）。当前文档"),a("code",[s._v("$page")]),s._v("内容如下 ——")])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("p",[s._v("此外，你还可以自己在文档的 Front Matter 中定义 "),a("code",[s._v("vars")]),s._v(" 字段，示例如下 ——")])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0,attrs:{class:"lang-yml"}},[a("code",[a("span",{attrs:{class:"hljs-meta"}},[s._v("---")]),s._v("\n"),a("span",{attrs:{class:"hljs-comment"}},[s._v("# ...")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("vars:")]),s._v("\n"),a("span",{attrs:{class:"hljs-attr"}},[s._v("  threeKingdoms:")]),s._v("\n"),a("span",{attrs:{class:"hljs-bullet"}},[s._v("    -")]),s._v(" "),a("span",{attrs:{class:"hljs-string"}},[s._v("魏")]),s._v("\n"),a("span",{attrs:{class:"hljs-bullet"}},[s._v("    -")]),s._v(" "),a("span",{attrs:{class:"hljs-string"}},[s._v("蜀")]),s._v("\n"),a("span",{attrs:{class:"hljs-bullet"}},[s._v("    -")]),s._v(" "),a("span",{attrs:{class:"hljs-string"}},[s._v("吴")]),s._v("\n"),a("span",{attrs:{class:"hljs-meta"}},[s._v("---")])])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("p",[s._v("在 Markdown 文档中，通过 "),a("code",[s._v("$vars")]),s._v(" 来获取数据。示例如下 ——")])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0,attrs:{class:"lang-xml"}},[a("code",[a("span",{attrs:{class:"hljs-comment"}},[s._v("\x3c!-- 代码 --\x3e")]),s._v("\n"),a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("em")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("v-for")]),s._v("="),a("span",{attrs:{class:"hljs-string"}},[s._v('"country in $vars.threeKingdoms"')]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v(":key")]),s._v("="),a("span",{attrs:{class:"hljs-string"}},[s._v('"country"')]),s._v(">")]),s._v("\n  {{country}}\n"),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("em")]),s._v(">")])])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("p",[s._v("除正常 Markdown 语法以及 HTML 标签外，还可以使用注册过的自定义组件 —— 通常用 "),a("code",[s._v("plugin/*.js")]),s._v(" 来注册，当然也可以通过布局文件来注册。示例如下 ——")])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0,attrs:{class:"lang-xml"}},[a("code",[a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("ul")]),s._v(">")]),s._v("\n  "),a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("li")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("v-for")]),s._v("="),a("span",{attrs:{class:"hljs-string"}},[s._v('"item in $vars.menu"')]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v(":key")]),s._v("="),a("span",{attrs:{class:"hljs-string"}},[s._v('"item.key"')]),s._v(">")]),s._v("\n    "),a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("router-link")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v(":to")]),s._v("="),a("span",{attrs:{class:"hljs-string"}},[s._v('"item"')]),s._v(">")]),s._v("{{ item }}"),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("router-link")]),s._v(">")]),s._v("\n  "),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("li")]),s._v(">")]),s._v("\n"),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("ul")]),s._v(">")])])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("p",[s._v("语言类型为"),a("code",[s._v("html")]),s._v("的 Markdown 代码块（Code Block）会被视为一个小型的 Vue SFC。你可以在里面写 "),a("code",[s._v("<template>")]),s._v(" "),a("code",[s._v("<script>")]),s._v(" "),a("code",[s._v("<style>")]),s._v("。")])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("p",[s._v("当然，有时候你也可以省去 "),a("code",[s._v("<template>")]),s._v(" 的标签，程序会在处理时自动加上。下面是示例 —— ")])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0,attrs:{class:"lang-html"}},[a("code",[a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("button")]),s._v(" @"),a("span",{attrs:{class:"hljs-attr"}},[s._v("click")]),s._v("="),a("span",{attrs:{class:"hljs-string"}},[s._v('"clickme()"')]),s._v(">")]),s._v("click me"),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("button")]),s._v(">")]),s._v("\n\n"),a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("script")]),s._v(">")]),a("span",{attrs:{class:"javascript"}},[s._v("\n"),a("span",{attrs:{class:"hljs-keyword"}},[s._v("export")]),s._v(" "),a("span",{attrs:{class:"hljs-keyword"}},[s._v("default")]),s._v(" {\n  "),a("span",{attrs:{class:"hljs-attr"}},[s._v("methods")]),s._v(": {\n    clickme () {\n      alert("),a("span",{attrs:{class:"hljs-string"}},[s._v("'hello'")]),s._v(")\n    }\n  }\n}\n")]),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("script")]),s._v(">")]),s._v("\n\n"),a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("style")]),s._v(">")]),a("span",{attrs:{class:"css"}},[s._v("\n  "),a("span",{attrs:{class:"hljs-selector-tag"}},[s._v("button")]),s._v(" {\n    "),a("span",{attrs:{class:"hljs-attribute"}},[s._v("background")]),s._v(": "),a("span",{attrs:{class:"hljs-number"}},[s._v("#f0f998")]),s._v(";\n  }\n")]),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("style")]),s._v(">")])])])},function(){var s=this.$createElement,t=this._self._c||s;return t("p",[t("strong",[this._v("注意")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ol",[a("li",[a("p",[s._v("因为语言类型为 "),a("code",[s._v("html")]),s._v(" 的代码块都被视为 Vue SFC 了，所以如果需要展示 HTML 怎么办呢？有一个办法是将语言类型写为 "),a("code",[s._v("xml")]),s._v("。多数情况下能解决问题，不影响高亮。")])]),s._v(" "),a("li",[a("p",[s._v("针对"),a("em",[s._v("某个")]),s._v("代码块，如果只想展示 Demo 效果，而不想展示源码，如何实现？办法是为 "),a("code",[s._v("<template>")]),s._v(" 加上一个 "),a("code",[s._v("demo-only")]),s._v(" 属性，即写成 "),a("code",[s._v("<template demo-only>")]),s._v("。效果如下 ——")])])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0,attrs:{class:"lang-xml"}},[a("code",[a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("template")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("demo-only")]),s._v(" "),a("span",{attrs:{class:"hljs-attr"}},[s._v("lang")]),s._v("="),a("span",{attrs:{class:"hljs-string"}},[s._v('"pug"')]),s._v(">")]),s._v("\n  div\n    em 我的底下并木有源码哟！\n"),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("template")]),s._v(">")]),s._v("\n\n"),a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("style")]),s._v(">")]),a("span",{attrs:{class:"css"}},[s._v("\n"),a("span",{attrs:{class:"hljs-selector-tag"}},[s._v("div")]),s._v(" "),a("span",{attrs:{class:"hljs-selector-tag"}},[s._v("em")]),s._v(" {\n  "),a("span",{attrs:{class:"hljs-attribute"}},[s._v("color")]),s._v(": red;\n}\n")]),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("style")]),s._v(">")])])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ol",{attrs:{start:"3"}},[a("li",[s._v("从上面的例子可以看出，我们在代码块也能写 "),a("code",[s._v("pug")]),s._v(" 模板。同样，CSS 也能够自己指定 SCSS、Stylus 等 —— 当然，需要自行安装对应的 package。具体的支持情况，需要查询 "),a("code",[s._v("rollup-plugin-vue")]),s._v("。")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ol",[a("li",[s._v("我们拓展了 "),a("code",[s._v("Vue")]),s._v(" 对象的 prototype，添加了一个 "),a("code",[s._v("$nprogress")]),s._v(" 对象。有必要的话你可以使用。（关于 "),a("a",{attrs:{href:"https://github.com/rstacruz/nprogress/"}},[s._v("nprogress")]),s._v("）")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("pre",{pre:!0,attrs:{class:"lang-html"}},[a("code",[a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("button")]),s._v(" @"),a("span",{attrs:{class:"hljs-attr"}},[s._v("click")]),s._v("="),a("span",{attrs:{class:"hljs-string"}},[s._v('"$nprogress.start"')]),s._v(">")]),s._v("\n  Start\n"),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("button")]),s._v(">")]),s._v("\n"),a("span",{attrs:{class:"hljs-tag"}},[s._v("<"),a("span",{attrs:{class:"hljs-name"}},[s._v("button")]),s._v(" @"),a("span",{attrs:{class:"hljs-attr"}},[s._v("click")]),s._v("="),a("span",{attrs:{class:"hljs-string"}},[s._v('"$nprogress.done"')]),s._v(">")]),s._v("\n  Done\n"),a("span",{attrs:{class:"hljs-tag"}},[s._v("</"),a("span",{attrs:{class:"hljs-name"}},[s._v("button")]),s._v(">")])])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ol",{attrs:{start:"2"}},[a("li",[a("p",[s._v("开发模式下支持有限度的“热更新”。因为使用的是 rollup 这一套，其实很难做到像 webpack 那种程度的 hot reload。目前只能根据利用 Vue 和 VueRouter 的一些特性来刷新组件（粒度只能做到页面级），稍微减轻 live reload 的痛苦。")])]),s._v(" "),a("li",[a("p",[s._v("目录下 "),a("code",[s._v(".cache")]),s._v(" 文件用于存放一些缓存。建议添加到 "),a("code",[s._v(".gitignore")]),s._v(" 中。另外，当你修改了 "),a("code",[s._v("pholio.config.js")]),s._v("之后，建议删除 "),a("code",[s._v(".cache")]),s._v(" 文件之后再运行相关命令。")])])])}],name:"pholio-content-usage-md",created:function(){this.__clean=function(s){if("undefined"!=typeof window&&"undefined"!=typeof document){var t=document.createElement("style");t.setAttribute("type","text/css"),t.innerHTML=s;var a=document.getElementsByTagName("head")[0];return a.appendChild(t),function(){a.removeChild(t)}}}("button[data-v-029571ac] {\n  background: #f0f998;\n}\ndiv em[data-v-029571ad] {\n  color: red;\n}")},destroyed:function(){this.__clean()},install:function(s){s.component(t.name,t)}};this.PholioContentUsageMd=t}).call(a);var n=a.PholioContentUsageMd;return"object"==typeof s&&void 0!==t&&(t.exports=n),t.exports}());