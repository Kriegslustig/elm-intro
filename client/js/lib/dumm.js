const dumm = {
  on (ev, cb) {
    return this.nodes.map(el => el.addEventListener(ev, cb.bind(el, el)))
  }
}
module.exports = (x, root = document) => {
  const obj = Object.create(dumm)
  if (typeof x === 'string') {
    obj.nodes = Array.prototype.slice.call(root.querySelectorAll(x), 0)
  } else if (typeof x === 'object') {
    obj.nodes = x
  }
  return obj
}

