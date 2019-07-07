import { expect } from "chai";
import { HttpClientStub, ValidationControllerStub, ValidationRulesStub } from "../stubs";

// import { SayHelloWorld } from "../../src/app/helloworld/sayhelloworld";
import { SayHelloWorld as SayHelloWorldMessage } from "../../src/app/helloworld/messages/sayhelloworld";

// tslint:disable:no-unused-expression

describe("SayHelloWorld test suite", () => {

    // TODO: Unit tests for our SayHelloWorld class

    /*
    const validationRules = new ValidationRulesStub();

    it("should do nothing when there is no valid input", async () => {
        const sut = new SayHelloWorld(HttpClientStub.ok(), ValidationControllerStub.notValid(), validationRules);
        sut.inputText = "//";
        sut.greetingText = "Hello";

        await sut.submit();

        expect(sut.greetingText).to.equal("");
    });

    it("focus on input should validate", async () => {
        const sut = new SayHelloWorld(HttpClientStub.ok(), ValidationControllerStub.notValid(), validationRules);
        sut.inputText = "Hello";

        await sut.inputTextOnfocus();

        expect(sut.greetingText).to.equal("");
    });

    it("should handle a valid response", async () => {
        const sut = new SayHelloWorld(
            HttpClientStub.ok({ greeting: "Hello World!" }),
            ValidationControllerStub.valid(),
            validationRules
        );
        sut.inputText = "Hello";

        await sut.submit();

        expect(sut.greetingText).to.equal("Hello World!");
    });

    it("should handle an error response", async () => {
        const sut = new SayHelloWorld(HttpClientStub.error(), ValidationControllerStub.valid(), validationRules);
        sut.inputText = "Error";
        sut.greetingText = "Hello";

        await sut.submit();

        expect(sut.greetingText).to.equal("");
    });
    */
});
