const fs = require('fs')
const path = require('path')
const glob = require('glob')
const async = require('async')

module.exports = pattern => {
  return new Promise((res, rej) => {
    var md
    glob(`${__dirname}/../../common/data/${pattern}.md`, (err, files) => {
      if(err) return rej(err)
      async.map(
        files,
        (file, next) => {
          fs.readFile(file, { encoding: 'utf8' }, (err, data) => {
            if(err) next(err)
            const res = /^# (.+)([\n.]*)/g.exec(data) || []
            next(null, {
              content: res[2],
              title: res[1] // The regex narrow implementation that only works well for showdown
            })
          })
        },
        (err, data) => {
          if(err) rej(err)
          res(data)
        }
      )
    })
  })
}

