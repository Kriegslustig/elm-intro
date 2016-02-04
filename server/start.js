const koa = require('koa')
const koaStatic = require('koa-static')
const routes = require('./main.js')
const app = koa()

routes(app, '/')
app.use(koaStatic(`${__dirname}/../client/assets/elm`))
app.listen(3000)

