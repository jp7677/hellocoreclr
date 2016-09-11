/// <reference path="../typings/index.d.ts" />
"use strict";

import { Config } from "../src/app/app.config";
import { StateProvider, UrlRouterProvider } from "stubs";

describe("Config Test ", () => {
    it("initializes correctly", () => {
        let stateProvider = new StateProvider();
        let urlRouterProvider = new UrlRouterProvider();

        let sut = new Config(stateProvider, urlRouterProvider);
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
