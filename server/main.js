const fs = require('fs')
const koaRouter = require('koa-router')
const co = require('co')

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
  app.use(router.routes())
  app.use(router.allowedMethods())
}

