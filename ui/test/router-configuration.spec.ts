import { expect } from "chai";

import { RouterConfiguration } from "../src/app/router-configuration";

describe("Config test suite", () => {
    it("should initialize correctly", () => {
        const sut = RouterConfiguration.build();

        expect(sut).to.not.undefined;
    });
});
