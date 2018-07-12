const chokidar = require('chokidar')
const { Observable } = require('rxjs')

const kWatchers = new Map()
const kEvents = ['add', 'change', 'unlink']

module.exports = pattern => {
  const fn = observer => {
    const key = `@[${pattern}]`
    const watcher =
      kWatchers.get(key) ||
      chokidar.watch(pattern, {
        ignoreInitial: true
      })
    const getListener = event => file => observer.next({ file, event })

    watcher.on('ready', () => {
      // watcher.getWatched()
      kEvents.forEach(event => {
        watcher.on(event, getListener(event))
      })
    })

    kWatchers.set(key, watcher)

    // Node doesn't exit after closing watchers
    // https://github.com/paulmillr/chokidar/issues/434
    return function cleanup () {
      watcher.close()
      kWatchers.delete(key)
    }
  }

  return Observable.create(fn)
}
