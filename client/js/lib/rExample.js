const R = require('./r')
const $ = require('./dumm')

module.exports = el => {
  const r = R()
  const render = square => el.children[0].innerHTML = square

  r.n = 0

  r(() => {
    render( Math.pow(r.n, 2) )
  })

  $('input', el).on('input', (t, e) => {
    r.n = Number(t.value)
  })
}

