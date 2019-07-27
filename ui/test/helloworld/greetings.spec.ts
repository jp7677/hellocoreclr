import { expect } from "chai";

import { config, RouterLinkStub, shallowMount } from "@vue/test-utils";
import axios from "axios";
import moxios from "moxios";
import { LoggerStub } from "../stubs";

import Greetings from "../../src/app/helloworld/greetings";

import sinon from "sinon";

// tslint:disable:no-unused-expression

describe("Greetings test suite", () => {
    beforeEach(() => {
        moxios.install();
        config.mocks.$http = axios;
        config.mocks.$log = LoggerStub.create();
        config.stubs.routerLink = RouterLinkStub;
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("should handle a valid response", done => {
        moxios.stubRequest("greetings/count", { status: 200, response: 5 });
        moxios.stubRequest("greetings", {
            response: [
                { greeting: "Hello", timestampUtc: new Date(Date.now()) },
                { greeting: "World", timestampUtc: new Date(Date.now()) }
            ],
            status: 200
        });

        const sut = shallowMount(Greetings).vm;

        moxios.wait(() => {
            expect(sut.numberOfSavedGreetings).not.to.be.undefined;
            expect(sut.numberOfSavedGreetings).to.equal(5);
            expect(sut.savedGreetings).not.to.be.undefined;
            expect(sut.savedGreetings.length).to.equal(2);
            done();
        });
    });

    it("should handle a valid response without content", done => {
        moxios.stubRequest("greetings/count", { status: 200, response: 0 });
        moxios.stubRequest("greetings", { status: 203 });

        const sut = shallowMount(Greetings).vm;

        moxios.wait(() => {
            expect(sut.numberOfSavedGreetings).not.to.be.undefined;
            expect(sut.numberOfSavedGreetings).to.equal(0);
            expect(sut.savedGreetings).not.to.be.undefined;
            expect(sut.savedGreetings.length).to.equal(0);
            done();
        });
    });

    it("should handle an error response", done => {
        moxios.stubRequest("greetings/count", { status: 500 });
        moxios.stubRequest("greetings", { status: 500 });

        const sut = shallowMount(Greetings).vm;

        moxios.wait(() => {
            expect(sut.numberOfSavedGreetings).not.to.be.undefined;
            expect(sut.numberOfSavedGreetings).to.equal(0);
            expect(sut.savedGreetings).not.to.be.undefined;
            expect(sut.savedGreetings.length).equal(0);
            done();
        });
    });
});
