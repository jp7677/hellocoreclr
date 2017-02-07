import * as chai from "chai";
import {Config} from "../src/app/config";
import {RouterConfigurationStub} from "./stubs";

describe("Config test suite", () => {

    it("should initialize correctly", () => {
        const routerConfiguration = new RouterConfigurationStub();
        const sut = new Config();

        sut.configureRouter(routerConfiguration);

        chai.expect(routerConfiguration.title).to.equals("Hello World");
        chai.expect(routerConfiguration.map.calledOnce).to.equals(true);
    });

});
