---
title: 首页
route: /

vars:
  menu:
    - about
    - desc
    - test
---

# Hello world!

<router-link v-for="item in $vars.menu" :key="item" :to="item">
{{ item }}
</router-link>

## Example

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

<style>
  button {
    background: #f0f998;
  }
</style>
```