import flushPromises from "flush-promises";

import { config, createLocalVue, RouterLinkStub, shallowMount } from "@vue/test-utils";
import axios from "axios";
import moxios from "moxios";
import { LoggerStub } from "../stubs";

import Greetings from "../../src/app/helloworld/greetings";

describe("Greetings test suite", () => {
    const Vue = createLocalVue();

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
        moxios.stubRequest("greetings/count", { status: 200, response: 5 });
        moxios.stubRequest("greetings", {
            response: [
                { greeting: "Hello", timestampUtc: new Date(Date.now()) },
                { greeting: "World", timestampUtc: new Date(Date.now()) },
            ],
            status: 200,
        });

        const sut = shallowMount(Greetings, { localVue: Vue }).vm;

        await flushPromises();
        expect(sut.numberOfSavedGreetings).not.toBeUndefined();
        expect(sut.numberOfSavedGreetings).toEqual(5);
        expect(sut.savedGreetings).not.toBeUndefined();
        expect(sut.savedGreetings.length).toEqual(2);
    });

    it("should handle a valid response without content", async () => {
        moxios.stubRequest("greetings/count", { status: 200, response: 0 });
        moxios.stubRequest("greetings", { status: 203 });

        const sut = shallowMount(Greetings, { localVue: Vue }).vm;

        await flushPromises();
        expect(sut.numberOfSavedGreetings).not.toBeUndefined();
        expect(sut.numberOfSavedGreetings).toEqual(0);
        expect(sut.savedGreetings).not.toBeUndefined();
        expect(sut.savedGreetings.length).toEqual(0);
    });

    it("should handle an error response", async () => {
        moxios.stubRequest("greetings/count", { status: 500 });
        moxios.stubRequest("greetings", { status: 500 });

        const sut = shallowMount(Greetings, { localVue: Vue }).vm;

        await flushPromises();
        expect(sut.numberOfSavedGreetings).not.toBeUndefined();
        expect(sut.numberOfSavedGreetings).toEqual(0);
        expect(sut.savedGreetings).not.toBeUndefined();
        expect(sut.savedGreetings.length).toEqual(0);
    });
});
