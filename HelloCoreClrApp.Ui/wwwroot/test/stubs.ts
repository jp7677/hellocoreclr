/// <reference path="../../../typings/sinon/sinon.d.ts" />
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
"use strict";

namespace stubs {
    export class StateProvider implements ng.ui.IStateProvider {
        state = sinon.stub();
        decorator = sinon.stub();
        $get = sinon.stub();
    }

    export class UrlRouterProvider implements ng.ui.IUrlRouterProvider {
        when = sinon.stub();
        otherwise = sinon.stub();
        rule = sinon.stub();
        deferIntercept = sinon.stub();
        $get = sinon.stub();
    }
}
