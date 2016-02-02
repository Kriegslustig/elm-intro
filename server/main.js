const fs = require('fs')
const koaRouter = require('koa-router')
const co = require('co')
const getMarkdown = require('./lib/getMarkdown')

const slides = [
  'start'
, 'contents'
, 'elm'
, 'architektur'
, 'pro_con_spa'
, 'reactive_programming'
, 'reactive_code'
, 'r_example'
, 'reactive_interfaces'
, 'virtual_dom'
, 'functional_programming'
, 'pure_functions'
, 'strong_typing'
, 'statically_checked'
, 'safety'
, 'search_elm'
, 'elm_reactor'
, 'reactive_frameworks'
].reduce((m, s, i) => {
  m[s] = i
  return m
}, {})

module.exports = (app, prefix) => {
  const router = koaRouter()
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
          this.body = JSON.stringify(
            md.reduce(
              (mem, slide, i) => {
                const n = typeof slides[slide.name] === 'undefined'
                  ? i
                  : slides[slide.name]
                mem[n] = slide
                console.log(mem)
                return mem
              },
              []
            )
          )
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

