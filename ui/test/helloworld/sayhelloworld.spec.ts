import flushPromises from "flush-promises";

import { config, createLocalVue, RouterLinkStub, shallowMount } from "@vue/test-utils";
import axios from "axios";
import moxios from "moxios";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { LoggerStub } from "../stubs";

import SayHelloWorld from "../../src/app/helloworld/sayhelloworld";

describe("SayHelloWorld test suite", () => {
    const Vue = createLocalVue();
    Vue.component("ValidationProvider", ValidationProvider);
    Vue.component("ValidationObserver", ValidationObserver);

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

        const sut = shallowMount(SayHelloWorld, { localVue: Vue }).vm;
        sut.inputText = "Hello";

        await sut.submit();

        await flushPromises();
        expect(sut.greetingText).toEqual("Hello World!");
    });

    it("should handle an error response", async () => {
        moxios.stubRequest("sayhelloworld/", { status: 500 });

        const sut = shallowMount(SayHelloWorld, { localVue: Vue }).vm;
        sut.inputText = "Error";
        sut.greetingText = "Hello";

        await sut.submit();

        await flushPromises();
        expect(sut.greetingText).toEqual("");
    });
});
