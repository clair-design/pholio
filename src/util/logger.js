module.exports = {
  info (...args) {
    console.log.apply(console, args)
  }
}
