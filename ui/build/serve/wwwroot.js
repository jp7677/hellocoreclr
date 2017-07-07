'use strict'

const {argv, paths} = require('../../settings')
const util = require('gulp-util')

exports.fn = (gulp, done) => {
  const connect = require('gulp-connect')
  const proxy = require('proxy-middleware')
  const url = require('url')
  const historyApiFallback = require('connect-history-api-fallback/lib')

  const apiBase = '/api'

  let proxyOptions = url.parse('http://localhost:5000/api')
  proxyOptions.route = apiBase

  if (argv.nomiddlewareproxy) {
    util.log('Returning HTTP/403 for ' + util.colors.green(apiBase))
  }

  connect.server({
    root: ['wwwroot'],
    port: 3000,
    middleware: (connect, options) => {
      return [
        (req, res, next) => {
          if (argv.nomiddlewareproxy && req.originalUrl.substring(0, apiBase.length) === apiBase) {
            res.statusCode = 403
            return next()
          }
          let handle = proxy(proxyOptions)
          return handle(req, res, next)
        },
        historyApiFallback()
      ]
    }
  })

  // Let the task finish here. The server still runs, we can stop it manually using serve:stop task.
  done()
}
