import {expect} from "chai";
import {Config} from "../src/app/config";
import {RouterConfigurationStub} from "./stubs";

// tslint:disable:no-unused-expression

describe("Config test suite", () => {

    it("should initialize correctly", () => {
        const routerConfiguration = new RouterConfigurationStub();
        const sut = new Config();

        sut.configureRouter(routerConfiguration);

        expect(routerConfiguration.title).to.equal("Hello World");
        expect(routerConfiguration.map.calledOnce).to.be.true;
    });

});
