"use strict";

import { Config } from "../src/app/app.config";
import { StateProvider, UrlRouterProvider } from "./stubs";
import chai from "chai";

describe("Config Test ", () => {
    it("initializes correctly", () => {
        let stateProvider = new StateProvider();
        let urlRouterProvider = new UrlRouterProvider();

        let sut = new Config(stateProvider, urlRouterProvider);
        chai.expect(urlRouterProvider.otherwise.calledOnce).to.equals(true);
        chai.expect(urlRouterProvider.otherwise.calledWithExactly("/helloworld")).to.equals(true);
        chai.expect(stateProvider.state.called).to.equals(true);
        chai.expect(stateProvider.state.calledWithExactly("helloworld", {
                    controller: "HelloWorldController",
                    controllerAs: "vm",
                    templateUrl: "app/greeting/helloworld.html",
                    url: "/helloworld"
                })).to.equals(true);

        chai.expect(sut).to.be.exist;
    });
});
