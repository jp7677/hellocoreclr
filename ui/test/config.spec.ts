"use strict";

import {Config} from "../src/app/config";
import {RouterConfigurationStub} from "./stubs";
import chai from "chai";

describe("Config Test ", () => {

    it("initializes correctly", () => {
        let routerConfiguration = new RouterConfigurationStub();

        let sut = new Config();
        sut.configureRouter(routerConfiguration);

        chai.expect(routerConfiguration.title).to.equals("Hello World");
        chai.expect(routerConfiguration.map.calledOnce).to.equals(true);
    });

});
