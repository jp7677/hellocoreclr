import {expect} from "chai";
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
    const validationRules = new ValidationRulesStub();

    it("should do nothing when there is no valid input", async () => {
        const sut = new SayHelloWorld(
            HttpClientStub.ok(),
            ValidationControllerStub.notValid(),
            validationRules);
        sut.inputText = "//";
        sut.greetingText = "Hello";

        await sut.submit();

        expect(sut.greetingText).to.equal("");
    });

    it("focus on input should validate", async () => {
        const sut = new SayHelloWorld(
            HttpClientStub.ok(),
            ValidationControllerStub.notValid(),
            validationRules);
        sut.inputText = "Hello";

        await sut.inputTextOnfocus();

        expect(sut.greetingText).to.equal("");
    });

    it("should handle a valid response", async () => {
        const sut = new SayHelloWorld(
            HttpClientStub.ok({greeting: "Hello World!"}),
            ValidationControllerStub.valid(),
            validationRules);
        sut.inputText = "Hello";

        await sut.submit();

        await wait();
        expect(sut.greetingText).to.equal("Hello World!");
    });

    it("should handle an error response", async () => {
        const sut = new SayHelloWorld(
            HttpClientStub.error(),
            ValidationControllerStub.valid(),
            validationRules);
        sut.inputText = "Error";
        sut.greetingText = "Hello";

        await sut.submit();

        await wait();
        expect(sut.greetingText).to.equal("");
    });
});
