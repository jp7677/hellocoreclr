const express = require('express')
const fallback = require('express-history-api-fallback')
const staticGzip = require('express-static-gzip')
const proxy = require('http-proxy-middleware')
const morgan = require('morgan')
const path = require('path')
const os = require('os')
const colors = require('colors/safe')

const port = 3000
const wwwroot = path.join(__dirname, 'wwwroot')
const ifaces = os.networkInterfaces()
const app = express()
const backendProxy = proxy({
  target: 'http://localhost:5000/',
  logLevel: 'debug',
  logProvider: () => {
    return {
      log: (message) => console.log(colors.gray(message)),
      debug: (message) => console.log(colors.gray(message)),
      info: (message) => console.log(colors.gray(message)),
      warn: (message) => console.log(colors.yellow(message)),
      error: (message) => console.log(colors.red(message))
    }
  }
})

app.use(morgan('dev'))
app.use('/', staticGzip(wwwroot))
app.use('/api', backendProxy)
app.use(fallback('index.html', {root: wwwroot}))

console.log(colors.yellow('Starting express web server.'))
console.log('Listening on port ' + colors.magenta(port) + ', serving ' + colors.cyan(wwwroot))
app.listen(port, '0.0.0.0', () => {
  console.log('Available on')
  Object.keys(ifaces).forEach(function (dev) {
    ifaces[dev].forEach(function (details) {
      if (details.family === 'IPv4') {
        console.log('  ' + colors.cyan('http://' + details.address + ':' + port))
      }
    })
  })
  console.log('Hit ' + colors.cyan('CTRL-C') + ' to stop the server')
})

process.on('SIGINT', function () {
  console.log(colors.yellow(' express web server stopped.'))
  process.exit()
})

process.on('SIGTERM', function () {
  console.log(colors.yellow(' express web server stopped.'))
  process.exit()
})
