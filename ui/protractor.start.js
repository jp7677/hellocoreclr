const path = require('path')
const express = require('express')
const childprocess = require('child_process')

const wwwroot = path.join(__dirname, 'wwwroot')
const port = 3000

const app = express()
app.use('/', express.static(wwwroot))

app.listen(port, () => {
  runProtractor()
})

const runProtractor = () => {
  const winExt = /^win/.test(process.platform) ? '.cmd' : ''
  const protractorBin = 'protractor' + winExt

  const protractorArgs = [ 'protractor.conf.js' ]
  if (process.argv.slice(2).length > 0) {
    protractorArgs.push(process.argv.slice(2))
  }

  childprocess.spawn(protractorBin, protractorArgs, {stdio: 'inherit'})
    .on('close', (code) => {
      if (code !== 0) {
        process.exit(code)
      } else {
        process.exit(0)
      }
    })
}
