'use strict'

const util = require('gulp-util')

exports.fn = (gulp, paths, argv, done) => {
  const connect = require('gulp-connect')
  const proxy = require('proxy-middleware')
  const url = require('url')
  const historyApiFallback = require('connect-history-api-fallback/lib')

  let proxyOptions = url.parse('http://localhost:5000/api')
  proxyOptions.route = '/api'

  connect.server({
    root: ['wwwroot'],
    port: 3000,
    middleware: (connect, options) => {
      return [
        (req, res, next) => {
          if (argv.nomiddlewareproxy && req.originalUrl.substring(0, 4) === '/api') {
            util.log('Returning HTTP/403 for ' + util.colors.green(req.originalUrl))
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
