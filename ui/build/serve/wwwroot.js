'use strict'

exports.fn = (gulp, paths, argv, done) => {
  var connect = require('gulp-connect')
  var proxy = require('proxy-middleware')
  var url = require('url')
  var historyApiFallback = require('connect-history-api-fallback/lib')

  var proxyOptions = url.parse('http://localhost:5000/api')
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
