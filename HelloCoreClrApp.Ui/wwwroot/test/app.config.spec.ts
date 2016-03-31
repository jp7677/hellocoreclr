/// <reference path="../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../typings/chai/chai.d.ts" />
/// <reference path="../../../typings/sinon/sinon.d.ts" />
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
"use strict";

describe("Config Test ", () => {
    it("initializes correctly", () => {
        let stateProvider = new StateProviderStub();
        let urlRouterProvider = new UrlRouterProvider();

        let sut = new app.Config(stateProvider, urlRouterProvider);
        chai.expect(urlRouterProvider.otherwise.calledOnce).to.equals(true);
        chai.expect(stateProvider.state.called).to.equals(true);
    });

    class StateProviderStub implements ng.ui.IStateProvider {
        state = sinon.stub();
        decorator = sinon.stub();
        $get = sinon.stub();
    }

    class UrlRouterProvider implements ng.ui.IUrlRouterProvider {
        when = sinon.stub();
        otherwise = sinon.stub();
        rule = sinon.stub();
        deferIntercept = sinon.stub();
        $get = sinon.stub();
    }
});
