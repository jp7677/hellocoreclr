declare var APPLICATIONMODE: string;

import * as chai from "chai";
import {Environment} from "../src/app/environment";

// tslint:disable:no-unused-expression

describe("Environment test suite", () => {

    it("should initialize correctly", () => {
        // tslint:disable:no-eval
        eval("APPLICATIONMODE = 'appMode';");
        const appsettings = {baseUrl: "api"};
        const sut = new Environment(appsettings);

        chai.expect(sut.applicationMode).to.equals("appMode");
        chai.expect(sut.baseUrl).to.equals("api");
        chai.expect(sut.IsDevelopment()).to.be.false;
        chai.expect(sut.IsStaging()).to.be.false;
        chai.expect(sut.IsProduction()).to.be.false;
    });

    it("should detect development", () => {
        // tslint:disable:no-eval
        eval("APPLICATIONMODE = 'Development';");
        const appsettings = {baseUrl: ""};
        const sut = new Environment(appsettings);

        chai.expect(sut.IsDevelopment()).to.be.true;
        chai.expect(sut.IsStaging()).to.be.false;
        chai.expect(sut.IsProduction()).to.be.false;
    });

    it("should detect staging", () => {
        // tslint:disable:no-eval
        eval("APPLICATIONMODE = 'Staging';");
        const appsettings = {baseUrl: ""};
        const sut = new Environment(appsettings);

        chai.expect(sut.IsDevelopment()).to.be.false;
        chai.expect(sut.IsStaging()).to.be.true;
        chai.expect(sut.IsProduction()).to.be.false;
    });

    it("should detect production", () => {
        // tslint:disable:no-eval
        eval("APPLICATIONMODE = 'Production';");
        const appsettings = {baseUrl: ""};
        const sut = new Environment(appsettings);

        chai.expect(sut.IsDevelopment()).to.be.false;
        chai.expect(sut.IsStaging()).to.be.false;
        chai.expect(sut.IsProduction()).to.be.true;
    });

});
