import { expect } from "chai";
import flushPromises from "flush-promises";

import { config, createLocalVue, RouterLinkStub, shallowMount } from "@vue/test-utils";
import axios from "axios";
import moxios from "moxios";
import VeeValidate from "vee-validate";
import { LoggerStub } from "../stubs";

import SayHelloWorld from "../../src/app/helloworld/sayhelloworld";

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

    it("should handle a valid response", async () => {
        moxios.stubRequest("sayhelloworld/", { status: 200, response: { greeting: "Hello World!" } });

        const sut = shallowMount(SayHelloWorld, { localVue: Vue, sync: false }).vm;
        sut.inputText = "Hello";

        await sut.submit();

        await flushPromises();
        expect(sut.greetingText).to.equal("Hello World!");
    });

    it("should handle an error response", async () => {
        moxios.stubRequest("sayhelloworld/", { status: 500 });

        const sut = shallowMount(SayHelloWorld, { localVue: Vue, sync: false }).vm;
        sut.inputText = "Error";
        sut.greetingText = "Hello";

        await sut.submit();

        await flushPromises();
        expect(sut.greetingText).to.equal("");
    });
});
