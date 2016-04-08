/// <reference path="../typings/browser/ambient/mocha/index.d.ts" />
/// <reference path="../typings/browser/ambient/chai/index.d.ts" />
/// <reference path="../typings/browser/ambient/sinon/index.d.ts" />
/// <reference path="../typings/browser/ambient/angular/index.d.ts" />
/// <reference path="../typings/browser/ambient/angular-ui-router/index.d.ts" />

namespace stubs {
"use strict";

    export class StateProvider implements ng.ui.IStateProvider {
        public state = sinon.stub();
        public decorator = sinon.stub();
        public $get = sinon.stub();
    }

    export class UrlRouterProvider implements ng.ui.IUrlRouterProvider {
        public when = sinon.stub();
        public otherwise = sinon.stub();
        public rule = sinon.stub();
        public deferIntercept = sinon.stub();
        public $get = sinon.stub();
    }
}
