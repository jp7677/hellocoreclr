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

let runProtractor = () => {
  let winExt = /^win/.test(process.platform) ? '.cmd' : ''
  let protractorBin = 'protractor' + winExt

  childprocess.spawn(protractorBin, [ 'protractor.conf.js' ], {stdio: 'inherit'})
    .on('close', (code) => {
      if (code !== 0) {
        process.exit(code)
      } else {
        process.exit(0)
      }
    })
}
