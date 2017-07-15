const ts = require('ts-node')

exports.config = {
  baseUrl: 'http://localhost:3000',
  specs: ['test-e2e/**/*.spec.ts'],
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
  onPrepare: () => {
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
