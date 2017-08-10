const path = require('path');
var wallabyWebpack = require('wallaby-webpack');

module.exports = function(wallaby) {
  return {
    files: [
      {
        pattern: 'node_modules/core-js/client/shim.js',
        instrument: false
      },
      { pattern: 'src/app/**/*.ts', load: false },
      { pattern: 'test/stubs.ts', load: false }
    ],
    tests: [{ pattern: 'test/**/*.spec.ts', load: false }],

    postprocessor: wallabyWebpack({
      module: {
        rules: [{ test: /\.css$/i, loader: 'css-loader' }]
      },
      resolve: {
        extensions: ['.js'],
        modules: [path.join(wallaby.projectCacheDir, 'src')]
      }
    }),
    setup: function() {
      window.__moduleBundler.loadTests();
    }
  };
};
