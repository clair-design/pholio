<template lang="pug">
  .app
    .navbar
      router-link(tag="h1" to="/").site-title Pholio
      router-link.navbar__item(
        v-for="(page, index) in pages"
        :key="index"
        :to="page.path"
      ) {{ page.title }}
    .main
      router-view
</template>

<script>

export default {
  computed: {
    currentPage() {
      const path = this.$route.path;
      return this.pages.filter(page => page.path === path)[0];
    },
  },
  created() {
    this.pages = this.$pages
      .filter(page => page.index > 0)
      .sort((a, b) => +a.index - b.index)
  },
};
</script>

<style>
body {
  background-color: #fbfbfb;
}

.app {
  width: 100%;
  height: 100%;
  color: #444;
}

.navbar {
  box-sizing: border-box;
  border-right: 1px solid #f0f0f0;

  & .site-title {
    font-family: fantasy;
    font-size: 28px;
    text-align: center;
    line-height: 1.4;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  & a {
    color: #444;
  }
}

@media screen and (min-width: 720px) {
  .navbar {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 200px;
  }
  .main {
    margin-left: 200px;
  }
}
</style>
