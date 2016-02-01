
// To prevent a fatal error in browsers without Proxy
window.Proxy = window.Proxy || (() => {})
const R = require('./r')

const $ = require('./dumm')

module.exports = el => {
  const r = R()
  const render = square => el.children[0].innerHTML = square

  r.n = 1
  r.m = 1

  r(() => {
    render( r.n * r.m )
  })

  $('.input1', el).on('input', (t, e) => {
    r.n = Number(t.value)
  })

  $('.input2', el).on('input', (t, e) => {
    r.m = Number(t.value)
  })
}

