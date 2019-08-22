import "normalize.css/normalize.css";
import "highlight.js/styles/github-gist.css";
import "../styles/theme.css";
import "../styles/index.css";
import "../styles/layout.css";
import Badge from "./components/badge.vue";

export default {
  install(Vue) {
    Vue.component("github-badge", Badge);
  }
};
