const path = require('path')
const server = require('local-web-server')
const childprocess = require('child_process')

const runCypress = () => {
  const winExt = /^win/.test(process.platform) ? '.cmd' : ''
  const cypressBin = 'cypress' + winExt

  const cypressArgs = ['run']
  if (process.argv.slice(2).length > 0) {
    process.argv.slice(2).forEach(arg => cypressArgs.push(arg))
  }

  childprocess.spawn(cypressBin, cypressArgs, { stdio: 'inherit' })
    .on('close', (code) => {
      ws.server.close()
      process.exit(code)
    })
}

const ws = server.create({
  port: 3000,
  directory: path.join(__dirname, 'wwwroot')
})

ws.server.on('error', (error) => {
  console.log(error)
})

runCypress()
