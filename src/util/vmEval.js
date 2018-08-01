const { runInNewContext } = require('vm')
const noop = () => {}

const sandBox = {
  console: new Proxy(
    {},
    {
      get () {
        return noop
      }
    }
  ),
  module: {
    exports: null
  }
}

module.exports = code => {
  try {
    runInNewContext(code, sandBox)
    return sandBox.module.exports
  } catch (e) {
    console.error(e)
  }
}
