import * as chai from "chai";
import {SayHelloWorld as SayHelloWorldMessage} from "../../src/app/helloworld/messages/sayhelloworld";
import {SayHelloWorld} from "../../src/app/helloworld/sayhelloworld";

import {HttpClientStub, ValidationControllerStub, ValidationRulesStub} from "../stubs";

function wait() {
    return new Promise((resolve, reject) => {
            setTimeout(resolve, 200);
        });
}

// tslint:disable:no-unused-expression

describe("SayHelloWorld test suite", () => {
    it("should do nothing when there is no valid input", async () => {
        const sut = new SayHelloWorld(
            HttpClientStub.ok(),
            ValidationControllerStub.notValid(),
            new ValidationRulesStub());
        sut.inputText = "//";
        sut.greetingText = "Hello";

        await sut.submit();

        chai.expect(sut.greetingText).to.empty;
    });

    it("focus on input should validate", async () => {
        const sut = new SayHelloWorld(
            HttpClientStub.ok(),
            ValidationControllerStub.notValid(),
            new ValidationRulesStub());
        sut.inputText = "Hello";

        await sut.inputTextOnfocus();

        chai.expect(sut.greetingText).to.empty;
    });

    it("should handle a valid response", async () => {
        const sut = new SayHelloWorld(
            HttpClientStub.ok({greeting: "Hello World!"}),
            ValidationControllerStub.valid(),
            new ValidationRulesStub());
        sut.inputText = "Hello";

        await sut.submit();

        await wait();
        chai.expect(sut.greetingText).to.equal("Hello World!");
    });

    it("should handle an error response", async () => {
        const sut = new SayHelloWorld(
            HttpClientStub.error(),
            ValidationControllerStub.valid(),
            new ValidationRulesStub());
        sut.inputText = "Error";
        sut.greetingText = "Hello";

        await sut.submit();

        await wait();
        chai.expect(sut.greetingText).to.empty;
    });
});
