module.exports = (init = {}) => {
  var recorder = null

  const cache = {}

  const store = new Proxy (init, {
    get (target, property, reciever) {
      if(recorder) recorder.push(property)
      return target[property]
    },
    set (target, property, value, reciever) {
      target[property] = value
      ;(cache[property] || []).map(fn => fn())
      return true
    }
  })

  const registerFunc = fn => {
    recorder = []
    fn()
    recorder
      .reduce((mem, el) => mem.indexOf(el) > -1
        ? mem
        : mem.concat(el),
        []
      )
      .forEach(el => {
        cache[el] = cache[el]
          ? cache[el].concat(fn)
          : [fn]
      })
    return recorder = null
  }

  const r = x => {
    if(typeof x === 'function') {
      return registerFunc(x)
    } else {
      return newVar(x)
    }
  }
  r.__proto__ = store
  return r
}

