import 'normalize.css/normalize.css'
import 'highlight.js/styles/github-gist.css'
import '../styles/theme.css'
import '../styles/index.css'
import '../styles/layout.css'

function badge (h) {
  return (
    <a href='https://github.com/clair-design/pholio' target='_blank'>
      <img src='https://img.shields.io/badge/github-pholio-green.svg?longCache=true&style=flat' />
    </a>
  )
}

export default {
  install (Vue) {
    Vue.component('github-badge', { render: badge })
  }
}
