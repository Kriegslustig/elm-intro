const fs = require('fs')
const koaRouter = require('koa-router')
const co = require('co')
const getMarkdown = require('./lib/getMarkdown')

const slides = [
  'start'
, 'contents'
, 'elm'
, 'reactive_programming'
, 'reactive_code'
, 'r_example'
, 'reactive_interfaces'
, 'virtual_dom'
, 'functional_programming'
, 'pure_functions'
, 'strong_typing'
, 'statically_checked'
, 'elm_signals'
, 'elm_errors'
, 'elm_reactor'
, 'eat'
, 'whatwhywhatisthis'
, 'architektur'
, 'pro_con_spa'
, 'reactive_frameworks'
, 'credits'
, 'search_elm'
].reduce((m, s, i) => {
  m[s] = i
  return m
}, {})

module.exports = (app, prefix) => {
  const router = koaRouter({ prefix })
  router.get('/', function *(next) {
    yield co(() => new Promise((res, rej) => {
      fs.readFile(`${__dirname}/../common/index.html`, { encoding: 'utf8' }, (err, data) => {
        if(err) return rej(err)
        this.status = 200
        this.body = data
        res()
      })
    }))
  })
  router.get('/slides', function *(next) {
    yield co(() => new Promise((res, rej) => {
      getMarkdown(`*`)
        .then(md => {
          const allslides = md.reduce(
              (mem, slide, i) => {
                if(typeof slides[slide.name] === 'undefined') return mem
                const n = slides[slide.name]
                mem[n] = slide
                return mem
              },
              []
            )
          this.body = JSON.stringify(allslides)
          this.status = 200
          res()
        })
        .catch(rej)
    }))
  })
  router.get('/hnposts', function *() {
    yield co(() => new Promise((res, rej) => {
      fs.readFile(`${__dirname}/../common/data/hnposts.json`, { encoding: 'utf8' }, (err, data) => {
        if(err) return rej(err)
        this.status = 200
        this.body = data
        res()
      })
    }))
  })
  app.use(router.routes())
  app.use(router.allowedMethods())
}

