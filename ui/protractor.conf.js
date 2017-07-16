const ts = require('ts-node')
const path = require('path')

const test = path.resolve(__dirname, 'test-e2e')

exports.config = {
  baseUrl: 'http://localhost:3000',
  specs: [ path.join(test, '**/*.spec.ts') ],
  directConnect: true,
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': [
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
    }
  },
  beforeLaunch: () => {
    ts.register({
      compilerOptions: { module: 'commonjs' },
      fast: true
    })
  },
  plugins: [{
    package: 'aurelia-protractor-plugin'
  }],
  SELENIUM_PROMISE_MANAGER: 0
}
