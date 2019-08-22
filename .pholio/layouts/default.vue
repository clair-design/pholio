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
    }
  },
  created() {
    this.pages = this.$pages
      .filter(page => page.index > 0)
      .sort((a, b) => +a.index - b.index);
  }
};
</script>
