import {expect} from "chai";
import {Greetings} from "../../src/app/helloworld/greetings";
import {SavedGreeting} from "../../src/app/helloworld/messages/savedgreeting";
import {HttpClientStub} from "../stubs";

// tslint:disable:no-unused-expression

describe("Greetings test suite", () => {

    it("should handle a valid response", async () => {
        const responses = new Map<string, any>();
        responses.set("greetings/count", "5");
        responses.set("greetings", [
            {greeting: "Hello", timestampUtc: new Date(Date.now())},
            {greeting: "World", timestampUtc: new Date(Date.now())}
        ]);
        const httpStub = HttpClientStub.okWithResponseMap(responses);
        const sut = new Greetings(httpStub);

        await sut.activate();

        expect(sut.numberOfSavedGreetings).not.to.be.undefined;
        expect(sut.numberOfSavedGreetings).to.equal("5");
        expect(sut.savedGreetings).not.to.be.undefined;
        expect(sut.savedGreetings.length).to.equal(2);
    });

    it("should handle a valid response without content", async () => {
        const httpStub = HttpClientStub.okNoContent();
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

});
