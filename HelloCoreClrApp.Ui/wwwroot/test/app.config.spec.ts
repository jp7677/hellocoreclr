/// <reference path="../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../typings/chai/chai.d.ts" />
/// <reference path="../../../typings/sinon/sinon.d.ts" />
/// <reference path="../../../typings/angular-ui-router/angular-ui-router.d.ts" />
"use strict";

describe("Config Test ", () => {
    it("initializes correctly", () => {
        let stateProvider = new stubs.StateProvider();
        let urlRouterProvider = new stubs.UrlRouterProvider();

        let sut = new app.Config(stateProvider, urlRouterProvider);
        chai.expect(urlRouterProvider.otherwise.calledOnce).to.equals(true);
        chai.expect(urlRouterProvider.otherwise.calledWithExactly("/helloworld")).to.equals(true);
        chai.expect(stateProvider.state.called).to.equals(true);
        chai.expect(stateProvider.state.calledWithExactly("helloworld", {
                    url: "/helloworld",
                    templateUrl: "app/greeting/helloworld.html",
                    controller: "HelloWorldController",
                    controllerAs: "vm"
                })).to.equals(true);
    });
});
