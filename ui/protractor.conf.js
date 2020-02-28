const ts = require('ts-node')
const path = require('path')

const test = path.resolve(__dirname, 'test-e2e')

exports.config = {
  baseUrl: 'http://localhost:3000',
  specs: [path.join(test, '**/*.feature')],
  directConnect: true,
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: [
        '--show-fps-counter',
        '--no-default-browser-check',
        '--no-first-run',
        '--disable-default-apps',
        '--disable-popup-blocking',
        '--disable-translate',
        '--disable-background-timer-throttling',
        '--disable-renderer-backgrounding',
        '--disable-device-discovery-notifications',
        '--no-gpu',
        '--headless'
      ]
    },
    'moz:firefoxOptions': {
      args: ['--headless']
    }
  },
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  cucumberOpts: {
    require: [path.join(test, '**/*.ts')],
    strict: true
  },
  onPrepare: () => {
    ts.register({
      compilerOptions: { module: 'commonjs' }
    })
  },
  SELENIUM_PROMISE_MANAGER: false
}
