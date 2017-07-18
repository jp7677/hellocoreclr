const path = require('path')
const httpServer = require('http-server')
const childprocess = require('child_process')

const server = httpServer.createServer({ root: path.join(__dirname, 'wwwroot') })
const port = 3000

server.listen(port, () => {
  runProtractor()
})

let runProtractor = () => {
  let winExt = /^win/.test(process.platform) ? '.cmd' : ''
  let nodeBinDir = path.join('node_modules', '.bin')
  let protractorBin = path.join(nodeBinDir, 'protractor' + winExt)

  childprocess.spawn(protractorBin, [ 'protractor.conf.js' ], {stdio: 'inherit'})
    .on('close', (code) => {
      if (code !== 0) {
        process.exit(code)
      } else {
        process.exit(0)
      }
    })
}
