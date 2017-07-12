import * as chai from "chai";
import {Environment} from "../src/app/environment";

// tslint:disable:no-unused-expression

describe("Environment test suite", () => {

    it("should initialize correctly", () => {
        const sut = new Environment({baseUrl: "api"}, "appMode");

        chai.expect(sut.applicationMode).to.equals("appMode");
        chai.expect(sut.baseUrl).to.equals("api");
        chai.expect(sut.IsDevelopment()).to.be.false;
        chai.expect(sut.IsStaging()).to.be.false;
        chai.expect(sut.IsProduction()).to.be.false;
    });

    it("should detect development", () => {
        const sut = new Environment({baseUrl: ""}, "Development");

        chai.expect(sut.IsDevelopment()).to.be.true;
        chai.expect(sut.IsStaging()).to.be.false;
        chai.expect(sut.IsProduction()).to.be.false;
    });

    it("should detect staging", () => {
        const sut = new Environment({baseUrl: ""}, "Staging");

        chai.expect(sut.IsDevelopment()).to.be.false;
        chai.expect(sut.IsStaging()).to.be.true;
        chai.expect(sut.IsProduction()).to.be.false;
    });

    it("should detect production", () => {
        const sut = new Environment({baseUrl: ""}, "Production");

        chai.expect(sut.IsDevelopment()).to.be.false;
        chai.expect(sut.IsStaging()).to.be.false;
        chai.expect(sut.IsProduction()).to.be.true;
    });

});
