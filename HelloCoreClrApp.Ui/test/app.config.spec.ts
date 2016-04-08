/// <reference path="../typings/browser/ambient/mocha/index.d.ts" />
/// <reference path="../typings/browser/ambient/chai/index.d.ts" />
/// <reference path="../typings/browser/ambient/sinon/index.d.ts" />
/// <reference path="../typings/browser/ambient/angular/index.d.ts" />
/// <reference path="../typings/browser/ambient/angular-ui-router/index.d.ts" />
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
