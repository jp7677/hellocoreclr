/// <reference path="../typings/globals/mocha/index.d.ts" />
/// <reference path="../typings/globals/chai/index.d.ts" />
/// <reference path="../typings/globals/sinon/index.d.ts" />
/// <reference path="../typings/globals/angular/index.d.ts" />
/// <reference path="../typings/globals/angular-ui-router/index.d.ts" />

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
