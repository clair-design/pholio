---
title: '使用 pholio'
route: /usage
layout: default
index: 2
meta:
  script:
    - innerHTML: console.log('Hello world.')
      body: true
  __dangerouslyDisableSanitizers:
    - script
vars:
  threeKingdoms:
    - 魏
    - 蜀
    - 吴
  menu:
    - error
    - usage
---

# 使用 pholio

## 命令说明

1. 指定在 3001 端口启动 devServer:

```shell
$ PORT=3001 pholio start
```

2. 构建，生成静态文件到磁盘

```shell
# 默认使用 3000 端口
$ pholio build
```

3. 清理缓存文件夹

```shell
$ pholio clean
```

## 创建你的文档专属目录

首先我们创建你的**文档专属目录**，比如就叫 `pholio`。

该文件夹由以下几个子目录构成：

```shell
pholio
├── content  # 可用于存放 Markdown 文件
├── layouts  # 存放用作布局 `.vue` 文件
├── plugins  # 存放 JavaScript 插件
├── static   # 存放静态文件
└── styles   # 存放一些由插件/Layout 文件引用的样式
```

## 相关配置文件

接着在**项目根目录**下新建 `pholio.config.js`，相关配置如下 ——

```js
module.exports = {
  plugins: './pholio/plugins', 
  layouts: './pholio/layouts',
  assetPath: './pholio/static',
  pages: ['./pholio/content/**/*.md'],
  output: './docs',

  // fallback 页面路由，通常是 404 页面或错误页面
  errorRedirect: '/404',

  // for vue-router: hash or history
  routerMode: 'hash',

  // md2vue 配置
  md2vue: {
    highlight: 'highlight.js', // 配置代码高亮工具
    inject: '' // markdown 中运行的各个 Vue 实例与源码之间可以插入一些自定义内容
  },

  // 外部资源 通常是单独引入的 CSS/JavaScript
  externals: [
    'https://lib.baomitu.com/font-awesome/4.7.0/css/font-awesome.min.css'
  ]
}
```


## 编写布局文件

重点在于 `router-view` 的使用。其他东西任由你写，就像正常的 Vue Single File Component 那样，只要在需要显示 Markdown 文档的位置用 `<router-view />` 占位即可。

以你现在所看的本文档为例，使用的布局大体可以示意如下 ——

```xml
<wrapper>
  <navbar>
    <h1></h1>
    <links>...</links>
  </navbar>

  <content>
    <router-view />
  </content>
</wrapper>
```

**注意**

1. 布局文件的文件名就是你将要在 Markdown 文本中标记`layout`时使用的名称。
2. depth 为 1，不会递归使用子目录中的文件

## 编写插件

1. `plugins` 文件下的 `.js` 文件将会自动注册
2. 请使用标准的 ES6 import export 语法
3. 每个文件需要使用 `export default ModuleName` 的格式对外暴露
4. 每个文件默认暴露的对象，必须包含 `install` 方法
5. 请参考 [Vue 的插件写法](https://cn.vuejs.org/v2/guide/plugins.html)
6. 通常 CSS 文件在插件中引入

示例如下 —— 

```js
import MyCustomElement from '/path/to/custom-element'
export default {
  install (Vue) {
    Vue.component('custom-element', MyCustomElement)
  }
}
```


## 编写样式

如前所述，通常 CSS 文件在插件中引入。或者写在布局文件中。

你大概需要以下几样样式：

1. 根据你选择的代码高亮主题（highlight.js 或 prism），引入或编写相应的样式
2. 引用或编写 Markdown 样式（如 github-markdown-theme 之类）
3. 布局样式及其他自定义样式

建议使用 PostCSS 编写。项目中 PostCSS 配置文件（`postcss.config.js`等），将自动应用到布局文件以及其他通过 JavaScript 引入的 CSS 文件上来。


## Markdown 文档编写

**特别注意** —— 必须保证一定要有一个 `route` 值为 `/` 或 `/index` 的文档存在

### Front Matters: 基本配置

每个 Markdown 文档开头需要使用 YAML 配置一些基本信息 —— 又称为“front matter”。其基本格式如下 ——

```yml
---
title: '页面标题'    # 主要用于HTML中的<title></title>
route: '/page/path' # 本文档对应的 path
layout: 'default'   # 使用 layouts/default.vue 布局
---
```

此外，你还可以使用 `meta` 字段来写入一些页面级别的 [VueMeta](https://github.com/declandewet/vue-meta) 配置。

```yml
meta:
  title: Clair
  titleTemplate: '%s - Yay!'
  htmlAttrs:
    amp: undefined
  meta:
    - hid: description
      name: description
      content: Hello World
  style:
    - cssText: ''
  script:
    - innerHTML: console.log('Hello world.')
      body: true
  noscript:
    - innerHTML: 'This website requires JavaScript.'
  # 注意下面这一行对于脚本来说很重要
  __dangerouslyDisableSanitizers:
    - script
```

### 页面内变量

在布局文件（以及 Markdown 文本）中，你可以通过 `$pages` 拿到整个站点所有的页面的基本信息，据此可以做一些诸如侧边栏生成之类的工作。（**该变量在布局文件中也能拿到**）

例如，本文档的相关信息如下：

<pre style="max-height: 200px;">
{{$pages}}
</pre>

通过 `$page` 可以拿到当前文档的基本配置信息（title、layout、route）。当前文档`$page`内容如下 ——

<pre>
{{ JSON.stringify($page, null, 2) }}
</pre>


此外，你还可以自己在文档的 Front Matter 中定义 `vars` 字段，示例如下 ——

```yml
---
# ...
vars:
  threeKingdoms:
    - 魏
    - 蜀
    - 吴
---
```

在 Markdown 文档中，通过 `$vars` 来获取数据。示例如下 ——

```xml
<!-- 代码 -->
<em v-for="country in $vars.threeKingdoms" :key="country">
  {{country}}
</em>
```

展示效果 ——
<div style="margin: 10px 40px 30px">
<em v-for="country in $vars.threeKingdoms" :key="country">
{{country}}
</em>
</div>

### 页面内标签

除正常 Markdown 语法以及 HTML 标签外，还可以使用注册过的自定义组件 —— 通常用 `plugin/*.js` 来注册，当然也可以通过布局文件来注册。示例如下 ——

```xml
<ul>
  <li v-for="item in $vars.menu" :key="item.key">
    <router-link :to="item">{{ item }}</router-link>
  </li>
</ul>
```

<ul>
  <li v-for="item in $vars.menu" :key="item.key">
    <router-link :to="item">{{ item }}</router-link>
  </li>
</ul>



## Demo  编写

语言类型为`html`的 Markdown 代码块（Code Block）会被视为一个小型的 Vue SFC。你可以在里面写 `<template>` `<script>` `<style>`。

当然，有时候你也可以省去 `<template>` 的标签，程序会在处理时自动加上。下面是示例 —— 

```html
<button @click="clickme()">click me</button>

<script>
export default {
  methods: {
    clickme () {
      alert('hello')
    }
  }
}
</script>

<style>
  button {
    background: #f0f998;
  }
</style>
```

**注意**

1. 因为语言类型为 `html` 的代码块都被视为 Vue SFC 了，所以如果需要展示 HTML 怎么办呢？有一个办法是将语言类型写为 `xml`。多数情况下能解决问题，不影响高亮。

2. 针对*某个*代码块，如果只想展示 Demo 效果，而不想展示源码，如何实现？办法是为 `<template>` 加上一个 `demo-only` 属性，即写成 `<template demo-only>`。效果如下 ——

```html
<template demo-only lang="pug">
  div
    em 我的底下并木有源码哟！
</template>

<style>
div em {
  color: red;
}
</style>
```

其原始代码为 —— 

```xml
<template demo-only lang="pug">
  div
    em 我的底下并木有源码哟！
</template>

<style>
div em {
  color: red;
}
</style>
```

3. 从上面的例子可以看出，我们在代码块也能写 `pug` 模板。同样，CSS 也能够自己指定 SCSS、Stylus 等 —— 当然，需要自行安装对应的 package。具体的支持情况，需要查询 `rollup-plugin-vue`。

## 其他

1. 我们拓展了 `Vue` 对象的 prototype，添加了一个 `$nprogress` 对象。有必要的话你可以使用。（关于 [nprogress](https://github.com/rstacruz/nprogress/)）


```html
<button @click="$nprogress.start">
  Start
</button>
<button @click="$nprogress.done">
  Done
</button>
```

2. 开发模式下支持有限度的“热更新”。因为使用的是 rollup 这一套，其实很难做到像 webpack 那种程度的 hot reload。目前只能根据利用 Vue 和 VueRouter 的一些特性来刷新组件（粒度只能做到页面级），稍微减轻 live reload 的痛苦。

3. 目录下 `.cache` 文件用于存放一些缓存。建议添加到 `.gitignore` 中。另外，当你修改了 `pholio.config.js`之后，建议删除 `.cache` 文件之后再运行相关命令。
