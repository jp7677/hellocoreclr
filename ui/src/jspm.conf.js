System.config({
  baseURL: './',
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    'npm:*': 'jspm_packages/npm/*',
    'github:*': 'jspm_packages/github/*'
  },

  map: {
    'angular': 'github:angular/bower-angular@1.5.8',
    'angular-bootstrap': 'github:angular-ui/bootstrap-bower@2.1.3',
    'angular-mocks': 'github:angular/bower-angular-mocks@1.5.8',
    'angular-ui-router': 'github:angular-ui/angular-ui-router-bower@0.3.1',
    'bootstrap': 'github:twbs/bootstrap@3.3.7',
    'chai': 'npm:chai@3.5.0',
    'css': 'github:systemjs/plugin-css@0.1.27',
    'font-awesome': 'npm:font-awesome@4.6.3',
    'jquery': 'npm:jquery@3.1.0',
    'mocha': 'npm:mocha@3.0.2',
    'sinon': 'npm:sinon@1.17.5',
    'toastr': 'github:CodeSeven/toastr@2.1.3',
    'github:CodeSeven/toastr@2.1.3': {
      'css': 'github:systemjs/plugin-css@0.1.27',
      'jquery': 'github:components/jquery@3.1.0'
    },
    'github:angular-ui/angular-ui-router-bower@0.3.1': {
      'angular': 'github:angular/bower-angular@1.5.8'
    },
    'github:angular/bower-angular-mocks@1.5.8': {
      'angular': 'github:angular/bower-angular@1.5.8'
    },
    'github:jspm/nodelibs-assert@0.1.0': {
      'assert': 'npm:assert@1.4.1'
    },
    'github:jspm/nodelibs-buffer@0.1.0': {
      'buffer': 'npm:buffer@3.6.0'
    },
    'github:jspm/nodelibs-process@0.1.2': {
      'process': 'npm:process@0.11.9'
    },
    'github:jspm/nodelibs-util@0.1.0': {
      'util': 'npm:util@0.10.3'
    },
    'github:jspm/nodelibs-vm@0.1.0': {
      'vm-browserify': 'npm:vm-browserify@0.0.4'
    },
    'github:twbs/bootstrap@3.3.7': {
      'jquery': 'npm:jquery@3.1.0'
    },
    'npm:assert@1.4.1': {
      'assert': 'github:jspm/nodelibs-assert@0.1.0',
      'buffer': 'github:jspm/nodelibs-buffer@0.1.0',
      'process': 'github:jspm/nodelibs-process@0.1.2',
      'util': 'npm:util@0.10.3'
    },
    'npm:buffer@3.6.0': {
      'base64-js': 'npm:base64-js@0.0.8',
      'child_process': 'github:jspm/nodelibs-child_process@0.1.0',
      'fs': 'github:jspm/nodelibs-fs@0.1.2',
      'ieee754': 'npm:ieee754@1.1.6',
      'isarray': 'npm:isarray@1.0.0',
      'process': 'github:jspm/nodelibs-process@0.1.2'
    },
    'npm:chai@3.5.0': {
      'assertion-error': 'npm:assertion-error@1.0.2',
      'buffer': 'github:jspm/nodelibs-buffer@0.1.0',
      'deep-eql': 'npm:deep-eql@0.1.3',
      'process': 'github:jspm/nodelibs-process@0.1.2',
      'systemjs-json': 'github:systemjs/plugin-json@0.1.2',
      'type-detect': 'npm:type-detect@1.0.0'
    },
    'npm:debug@2.2.0': {
      'ms': 'npm:ms@0.7.1'
    },
    'npm:deep-eql@0.1.3': {
      'buffer': 'github:jspm/nodelibs-buffer@0.1.0',
      'type-detect': 'npm:type-detect@0.1.1'
    },
    'npm:font-awesome@4.6.3': {
      'css': 'github:systemjs/plugin-css@0.1.27'
    },
    'npm:formatio@1.1.1': {
      'process': 'github:jspm/nodelibs-process@0.1.2',
      'samsam': 'npm:samsam@1.1.2'
    },
    'npm:inherits@2.0.1': {
      'util': 'github:jspm/nodelibs-util@0.1.0'
    },
    'npm:lodash._baseassign@3.2.0': {
      'lodash._basecopy': 'npm:lodash._basecopy@3.0.1',
      'lodash.keys': 'npm:lodash.keys@3.1.2'
    },
    'npm:lodash.create@3.1.1': {
      'lodash._baseassign': 'npm:lodash._baseassign@3.2.0',
      'lodash._basecreate': 'npm:lodash._basecreate@3.0.3',
      'lodash._isiterateecall': 'npm:lodash._isiterateecall@3.0.9'
    },
    'npm:lodash.keys@3.1.2': {
      'lodash._getnative': 'npm:lodash._getnative@3.9.1',
      'lodash.isarguments': 'npm:lodash.isarguments@3.1.0',
      'lodash.isarray': 'npm:lodash.isarray@3.0.4'
    },
    'npm:mocha@3.0.2': {
      'css': 'github:systemjs/plugin-css@0.1.27',
      'debug': 'npm:debug@2.2.0',
      'json3': 'npm:json3@3.3.2',
      'lodash.create': 'npm:lodash.create@3.1.1'
    },
    'npm:process@0.11.9': {
      'assert': 'github:jspm/nodelibs-assert@0.1.0',
      'fs': 'github:jspm/nodelibs-fs@0.1.2',
      'vm': 'github:jspm/nodelibs-vm@0.1.0'
    },
    'npm:sinon@1.17.5': {
      'formatio': 'npm:formatio@1.1.1',
      'lolex': 'npm:lolex@1.3.2',
      'process': 'github:jspm/nodelibs-process@0.1.2',
      'samsam': 'npm:samsam@1.1.2',
      'util': 'npm:util@0.10.3'
    },
    'npm:util@0.10.3': {
      'inherits': 'npm:inherits@2.0.1',
      'process': 'github:jspm/nodelibs-process@0.1.2'
    },
    'npm:vm-browserify@0.0.4': {
      'indexof': 'npm:indexof@0.0.1'
    }
  }
})
