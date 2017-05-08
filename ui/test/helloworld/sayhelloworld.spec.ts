import {NewInstance} from "aurelia-framework";
import {ValidationController} from "aurelia-validation";
import * as chai from "chai";
import {SayHelloWorld as SayHelloWorldMessage} from "../../src/app/helloworld/messages/sayhelloworld";
import {SayHelloWorld} from "../../src/app/helloworld/sayhelloworld";

import {bootstrap} from "aurelia-bootstrapper";
import {ComponentTester, StageComponent} from "aurelia-testing";
import {HttpClientStub, ValidationControllerStub} from "../stubs";

function wait() {
    return new Promise((resolve, reject) => {
            setTimeout(resolve, 200);
        });
}

describe("SayHelloWorld test suite", () => {
    let component: ComponentTester;

    before(async () => {
        component = StageComponent.withResources()
            .inView("<div></div>")
            .boundTo({});
        component.bootstrap((aurelia) =>
            aurelia.use
            .standardConfiguration()
            .plugin("aurelia-validation"));
        await component.create(bootstrap);
    });

    after(() => {
        component.dispose();
    });

    it("should do nothing when there is no valid input", async () => {
        const sut = new SayHelloWorld(HttpClientStub.ok(), ValidationControllerStub.notValid());
        sut.inputText = "//";
        sut.greetingText = "Hello";

        await sut.submit();

        chai.expect(sut.greetingText).to.empty;
    });

    it("focus on input should validate", async () => {
        const sut = new SayHelloWorld(HttpClientStub.ok(), ValidationControllerStub.notValid());
        sut.inputText = "Hello";

        await sut.inputTextOnfocus();

        chai.expect(sut.greetingText).to.empty;
    });

    it("should handle a valid response", async () => {
        const sut = new SayHelloWorld(HttpClientStub.ok({greeting: "Hello World!"}),
            ValidationControllerStub.valid());
        sut.inputText = "Hello";

        await sut.submit();

        await wait();
        chai.expect(sut.greetingText).to.equal("Hello World!");
    });

    it("should handle an error response", async () => {
        const sut = new SayHelloWorld(HttpClientStub.error(), ValidationControllerStub.valid());
        sut.inputText = "Error";
        sut.greetingText = "Hello";

        await sut.submit();

        await wait();
        chai.expect(sut.greetingText).to.empty;
    });
});
