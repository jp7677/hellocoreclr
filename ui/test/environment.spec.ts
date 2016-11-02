"use strict";

import {Environment} from "../src/app/environment";
import chai from "chai";

describe("Environment test suite", () => {

    it("should initialize correctly", () => {
        let appsettings = {applicationMode: "appMode", baseUrl: "api"};
        let sut = new Environment(appsettings);

        chai.expect(sut.applicationMode).to.equals("appMode");
        chai.expect(sut.baseUrl).to.equals("api");
        chai.expect(sut.IsDevelopment()).to.be.false;
        chai.expect(sut.IsStaging()).to.be.false;
        chai.expect(sut.IsProduction()).to.be.false;
    });

    it("should detect development", () => {
        let appsettings = {applicationMode: "Development", baseUrl: ""};
        let sut = new Environment(appsettings);

        chai.expect(sut.IsDevelopment()).to.be.true;
        chai.expect(sut.IsStaging()).to.be.false;
        chai.expect(sut.IsProduction()).to.be.false;
    });

    it("should detect staging", () => {
        let appsettings = {applicationMode: "Staging", baseUrl: ""};
        let sut = new Environment(appsettings);

        chai.expect(sut.IsDevelopment()).to.be.false;
        chai.expect(sut.IsStaging()).to.be.true;
        chai.expect(sut.IsProduction()).to.be.false;
    });

    it("should detect production", () => {
        let appsettings = {applicationMode: "Production", baseUrl: ""};
        let sut = new Environment(appsettings);

        chai.expect(sut.IsDevelopment()).to.be.false;
        chai.expect(sut.IsStaging()).to.be.false;
        chai.expect(sut.IsProduction()).to.be.true;
    });

});
