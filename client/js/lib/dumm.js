const editClass = (str, cb) => cb(str.split(' ')).join(' ')

const dumm = {
  on (ev, cb) {
    this.events[ev] = this.events[ev]
      ? this.events[ev].concat(cb)
      : this.events[ev] = [cb]
    this.nodes.map(el => el.addEventListener(ev, cb.bind(el, el)))
    return this
  },
  addClass (cl) {
    this.nodes.map(el => {
      el.className = editClass(el.className, arr => arr.push(cl))
    })
    return this
  },
  rmClass (cl) {
    this.nodes.map(el => {
      el.className = editClass(el.className, arr => arr.filter(c => c !== cl))
    })
  }
}

module.exports = (x, root = document) => {
  const obj = Object.create(dumm)
  if (typeof x === 'string') {
    obj.nodes = Array.prototype.slice.call(root.querySelectorAll(x), 0)
  } else if (typeof x === 'object') {
    obj.nodes = x
  }
  obj.events = {}
  return obj
}

