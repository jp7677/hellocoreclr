/// <reference path="../../../typings/browser.d.ts" />
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
