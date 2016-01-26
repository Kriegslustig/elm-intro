const xhr = require('./xhr')
const r = require('./r')()
const $ = require('./dumm')


module.exports = root => {
  const render = (els, n) => {
    root.innerHTML = `<p>Resultate: ${n}</p><ul>` + els
      .map(el => `<li>${el}</li>`)
      .join('')
      + '</ul>'
  }

  r.query = ''
  r.values = []

  r(() => {
    const query = r.query.toLowerCase()
    const result = r.values
      .filter(el => el.toLowerCase().indexOf(query) > -1)
    render(result, result.length)
  })

  $('input', root.parentNode).on('keyup', el => {
    r.query = el.value
  })

  xhr('/hnposts', res => {
    r.values = res.map(el => el.title || el.text || "")
  })
}

