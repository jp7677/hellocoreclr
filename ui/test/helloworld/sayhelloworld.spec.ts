import {SayHelloWorld as SayHelloWorldMessage} from "../../src/app/helloworld/messages/sayhelloworld";
import {SayHelloWorld} from "../../src/app/helloworld/sayhelloworld";

import {HttpClientStub, ValidationControllerStub} from "../stubs";

function wait() {
    return new Promise((resolve, reject) => {
            setTimeout(resolve, 200);
        });
}

// tslint:disable:no-unused-expression

describe("SayHelloWorld test suite", () => {
    const validationRules = jasmine.createSpyObj("ValidationRulesStub", ["setRules"]);

    it("should do nothing when there is no valid input", async () => {
        const sut = new SayHelloWorld(
            HttpClientStub.ok(),
            ValidationControllerStub.notValid(),
            validationRules);
        sut.inputText = "//";
        sut.greetingText = "Hello";

        await sut.submit();

        expect(sut.greetingText).toBe("");
    });

    it("focus on input should validate", async () => {
        const sut = new SayHelloWorld(
            HttpClientStub.ok(),
            ValidationControllerStub.notValid(),
            validationRules);
        sut.inputText = "Hello";

        await sut.inputTextOnfocus();

        expect(sut.greetingText).toBe("");
    });

    it("should handle a valid response", async (done) => {
        const sut = new SayHelloWorld(
            HttpClientStub.ok({greeting: "Hello World!"}),
            ValidationControllerStub.valid(),
            validationRules);
        sut.inputText = "Hello";

        await sut.submit();

        await wait();
        expect(sut.greetingText).toBe("Hello World!");
        done();
    });

    it("should handle an error response", async (done) => {
        const sut = new SayHelloWorld(
            HttpClientStub.error(),
            ValidationControllerStub.valid(),
            validationRules);
        sut.inputText = "Error";
        sut.greetingText = "Hello";

        await sut.submit();

        await wait();
        expect(sut.greetingText).toBe("");
        done();
    });
});
