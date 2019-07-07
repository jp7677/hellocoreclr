import { expect } from "chai";
import { HttpClientStub } from "../stubs";

// import { Greetings } from "../../src/app/helloworld/greetings";
import { SavedGreeting } from "../../src/app/helloworld/messages/savedgreeting";

// tslint:disable:no-unused-expression

describe("Greetings test suite", () => {

    // TODO: Unit tests for our Greetings class

    /*
    it("should handle a valid response", async () => {
        const responses = new Map<string, [number, any]>();
        responses.set("greetings/count", [200, "5"]);
        responses.set("greetings", [
            200,
            [
                { greeting: "Hello", timestampUtc: new Date(Date.now()) },
                { greeting: "World", timestampUtc: new Date(Date.now()) }
            ]
        ]);
        const httpStub = HttpClientStub.withResponseMap(responses);
        const sut = new Greetings(httpStub);

        await sut.activate();

        expect(sut.numberOfSavedGreetings).not.to.be.undefined;
        expect(sut.numberOfSavedGreetings).to.equal("5");
        expect(sut.savedGreetings).not.to.be.undefined;
        expect(sut.savedGreetings.length).to.equal(2);
    });

    it("should handle a valid response without content", async () => {
        const responses = new Map<string, [number, any]>();
        responses.set("greetings/count", [200, "0"]);
        responses.set("greetings", [203, undefined]);
        const httpStub = HttpClientStub.withResponseMap(responses);
        const sut = new Greetings(httpStub);

        await sut.activate();

        expect(sut.numberOfSavedGreetings).not.to.be.undefined;
        expect(sut.numberOfSavedGreetings).to.equal("0");
        expect(sut.savedGreetings).not.to.be.undefined;
        expect(sut.savedGreetings.length).to.equal(0);
    });

    it("should handle an error response", async () => {
        const httpStub = HttpClientStub.error();
        const sut = new Greetings(httpStub);

        await sut.activate();

        expect(sut.numberOfSavedGreetings).not.to.be.undefined;
        expect(sut.numberOfSavedGreetings).to.equal("0");
        expect(sut.savedGreetings).not.to.be.undefined;
        expect(sut.savedGreetings.length).equal(0);
    });
    */
});
