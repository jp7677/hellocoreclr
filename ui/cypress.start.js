const path = require('path')
const express = require('express')
const childprocess = require('child_process')

const wwwroot = path.join(__dirname, 'wwwroot')
const port = 3000

const app = express()
app.use('/', express.static(wwwroot))

app.listen(port, () => {
  runCypress()
})

const runCypress = () => {
  const winExt = /^win/.test(process.platform) ? '.cmd' : ''
  const cypressBin = 'cypress' + winExt

  const cypressArgs = ['run']
  if (process.argv.slice(2).length > 0) {
    process.argv.slice(2).forEach(arg => cypressArgs.push(arg))
  }

  childprocess.spawn(cypressBin, cypressArgs, { stdio: 'inherit' })
    .on('close', (code) => {
      if (code !== 0) {
        process.exit(code)
      } else {
        process.exit(0)
      }
    })
}
