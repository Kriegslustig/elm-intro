const R = require('./r')
const $ = require('./dumm')
const handlebars = require('handlebars')

const template = handlebars.compile('<p>{{ square }}</p>')

module.exports = el => {
  const r = R()
  const render = data => el.children[0].innerHTML = template(data)

  r.n = 0

  r(() => {
    render({ square: r.n * r.n })
  })

  $('input', el).on('input', (t, e) => {
    r.n = Number(t.value)
  })
}

