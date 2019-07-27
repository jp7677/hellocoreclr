import { expect } from "chai";

import { config, createLocalVue, RouterLinkStub, shallowMount } from "@vue/test-utils";
import axios from "axios";
import moxios from "moxios";
import { LoggerStub } from "../stubs";

import SayHelloWorld from "../../src/app/helloworld/sayhelloworld";

import VeeValidate from "vee-validate";

// tslint:disable:no-unused-expression

describe("SayHelloWorld test suite", () => {
    const Vue = createLocalVue();
    Vue.use(VeeValidate, {
        errorBagName: "vueErrors",
        fieldsBagName: "vueFields"
    });

    beforeEach(() => {
        moxios.install();
        config.mocks.$http = axios;
        config.mocks.$log = LoggerStub.create();
        config.stubs.routerLink = RouterLinkStub;
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it("should handle a valid response", async done => {
        moxios.stubRequest("sayhelloworld/", { status: 200, response: { greeting: "Hello World!" } });

        const sut = shallowMount(SayHelloWorld, { localVue: Vue, sync: false }).vm;
        sut.inputText = "Hello";

        await sut.submit();

        moxios.wait(() => {
            expect(sut.greetingText).to.equal("Hello World!");
            done();
        });
    });

    it("should handle an error response", async done => {
        moxios.stubRequest("sayhelloworld/", { status: 500 });
        const sut = shallowMount(SayHelloWorld, { localVue: Vue, sync: false }).vm;
        sut.inputText = "Error";
        sut.greetingText = "Hello";

        await sut.submit();

        moxios.wait(() => {
            expect(sut.greetingText).to.equal("");
            done();
        });
    });
});
