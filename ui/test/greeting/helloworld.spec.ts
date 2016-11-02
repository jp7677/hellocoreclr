"use strict";

import {HelloWorld} from "../../src/app/greeting/helloworld";
import {SayHelloWorldResponse} from "../../src/app/greeting/sayhelloworldresponse";
import {HttpClientStub} from "../stubs";
import chai from "chai";

function wait() {
    return new Promise((resolve, reject) => {
            setTimeout(resolve, 200);
        });
}

describe("HelloWorldController test suite", () => {

    it("should do nothing when there is no input", () => {
        let sut = new HelloWorld(HttpClientStub.ok());
        sut.inputText = undefined;
        sut.labelText = "Hello";

        sut.submit();

        chai.expect(sut.labelText).to.empty;
    });

    it("should handle a valid response", () => {
        let res = new SayHelloWorldResponse();
        res.greeting = "Hello World!";
        let httpStub = HttpClientStub.ok(res);
        let sut = new HelloWorld(httpStub);
        sut.inputText = "Hello";

        sut.submit();

        return wait().then(() => {
            chai.expect(sut.labelText).to.equal("Hello World!");
        });
    });

    it("should handle an error response", () => {
        let httpStub = HttpClientStub.error();
        let sut = new HelloWorld(httpStub);
        sut.inputText = "Error";
        sut.labelText = "Hello";

        sut.submit();

        return wait().then(() => {
            chai.expect(sut.labelText).to.empty;
        });
    });

});
