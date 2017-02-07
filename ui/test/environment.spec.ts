import * as chai from "chai";
import {Environment} from "../src/app/environment";

describe("Environment test suite", () => {

    it("should initialize correctly", () => {
        const appsettings = {applicationMode: "appMode", baseUrl: "api"};
        const sut = new Environment(appsettings);

        chai.expect(sut.applicationMode).to.equals("appMode");
        chai.expect(sut.baseUrl).to.equals("api");
        chai.expect(sut.IsDevelopment()).to.be.false;
        chai.expect(sut.IsStaging()).to.be.false;
        chai.expect(sut.IsProduction()).to.be.false;
    });

    it("should detect development", () => {
        const appsettings = {applicationMode: "Development", baseUrl: ""};
        const sut = new Environment(appsettings);

        chai.expect(sut.IsDevelopment()).to.be.true;
        chai.expect(sut.IsStaging()).to.be.false;
        chai.expect(sut.IsProduction()).to.be.false;
    });

    it("should detect staging", () => {
        const appsettings = {applicationMode: "Staging", baseUrl: ""};
        const sut = new Environment(appsettings);

        chai.expect(sut.IsDevelopment()).to.be.false;
        chai.expect(sut.IsStaging()).to.be.true;
        chai.expect(sut.IsProduction()).to.be.false;
    });

    it("should detect production", () => {
        const appsettings = {applicationMode: "Production", baseUrl: ""};
        const sut = new Environment(appsettings);

        chai.expect(sut.IsDevelopment()).to.be.false;
        chai.expect(sut.IsStaging()).to.be.false;
        chai.expect(sut.IsProduction()).to.be.true;
    });

});
