'use strict'

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
      return [proxy(proxyOptions), historyApiFallback()]
    }
  })

  // Let the task finish here. The server still runs, we can stop it manually using serve:stop task.
  done()
}
