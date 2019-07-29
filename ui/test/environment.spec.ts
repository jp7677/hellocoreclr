import { expect } from "chai";
import { Environment } from "../src/app/environment";

// tslint:disable:no-unused-expression

describe("Environment test suite", () => {
    it("should initialize correctly", () => {
        const sut = new Environment({ baseUrl: "api" }, "appMode");

        expect(sut.applicationMode).to.equal("appMode");
        expect(sut.baseUrl).to.equal("api");
        expect(sut.IsDevelopment()).to.equal(false);
        expect(sut.IsStaging()).to.equal(false);
        expect(sut.IsProduction()).to.equal(false);
        expect(sut.IsKarma()).to.equal(false);
    });

    it("should detect development", () => {
        const sut = new Environment({ baseUrl: "" }, "Development");

        expect(sut.IsDevelopment()).to.equal(true);
        expect(sut.IsStaging()).to.equal(false);
        expect(sut.IsProduction()).to.equal(false);
        expect(sut.IsKarma()).to.equal(false);
    });

    it("should detect staging", () => {
        const sut = new Environment({ baseUrl: "" }, "Staging");

        expect(sut.IsDevelopment()).to.equal(false);
        expect(sut.IsStaging()).to.equal(true);
        expect(sut.IsProduction()).to.equal(false);
        expect(sut.IsKarma()).to.equal(false);
    });

    it("should detect production", () => {
        const sut = new Environment({ baseUrl: "" }, "Production");

        expect(sut.IsDevelopment()).to.equal(false);
        expect(sut.IsStaging()).to.equal(false);
        expect(sut.IsProduction()).to.equal(true);
        expect(sut.IsKarma()).to.equal(false);
    });

    it("should detect karma", () => {
        const sut = new Environment({ baseUrl: "" }, "Karma");

        expect(sut.IsDevelopment()).to.equal(false);
        expect(sut.IsStaging()).to.equal(false);
        expect(sut.IsProduction()).to.equal(false);
        expect(sut.IsKarma()).to.equal(true);
    });
});
