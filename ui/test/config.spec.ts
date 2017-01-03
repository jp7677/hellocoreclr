"use strict";

import chai from "chai";
import {Config} from "../src/app/config";
import {RouterConfigurationStub} from "./stubs";

describe("Config test suite", () => {

    it("should initialize correctly", () => {
        let routerConfiguration = new RouterConfigurationStub();
        let sut = new Config();

        sut.configureRouter(routerConfiguration);

        chai.expect(routerConfiguration.title).to.equals("Hello Worl1d");
        chai.expect(routerConfiguration.map.calledOnce).to.equals(true);
    });

});
