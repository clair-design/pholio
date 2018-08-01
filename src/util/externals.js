module.exports = function (externals) {
  externals = externals || []
  const defaults = {
    js: '',
    css: ''
  }

  if (process.env.NODE_ENV !== 'production') {
    externals = externals.concat([
      'https://lib.baomitu.com/notie/4.3.1/notie.min.js',
      'https://lib.baomitu.com/notie/4.3.1/notie.min.css'
    ])
  }

  return (externals || []).reduce((acc, url) => {
    if (/\.css$/.test(url)) {
      acc.css += `<link rel="stylesheet" href="${url}" />`
    } else if (/\.js/.test(url)) {
      acc.js += `<script src="${url}"></script>`
    }
    return acc
  }, defaults)
}
