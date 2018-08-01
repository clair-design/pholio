---
title: 首页
route: /

vars:
  date: '2018-07-25'
  func: 222
  menu:
    - about
    - desc
    - test
---

# Hello world!

<router-link v-for="item in $vars.menu" :key="item" :to="item">
{{ item }}
</router-link>

## 沧浪之水清兮 可以濯我缨~~

Page info:

<pre>
{{ JSON.stringify($page, null, 2) }}
</pre>

Local vars:

<pre>
{{ Object.keys($vars) }}
</pre>


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
```