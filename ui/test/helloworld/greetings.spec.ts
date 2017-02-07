import * as chai from "chai";
import {Greetings} from "../../src/app/helloworld/greetings";
import {SavedGreeting} from "../../src/app/helloworld/messages/savedgreeting";
import {HttpClientStub} from "../stubs";

function wait() {
    return new Promise((resolve, reject) => {
            setTimeout(resolve, 200);
        });
}

describe("Greetings test suite", () => {

    it("should handle a valid response", async () => {
        const responses = new Map<string, any>();
        responses.set("greetings/count", "5");
        responses.set("greetings", [
            {greeting: "Hello", timestampUtc: new Date(Date.now)},
            {greeting: "World", timestampUtc: new Date(Date.now)}
        ]);
        const httpStub = HttpClientStub.okWithResponseMap(responses);

        const sut = new Greetings(httpStub);

        await wait();
        chai.expect(sut.numberOfSavedGreetings).not.to.be.undefined;
        chai.expect(sut.numberOfSavedGreetings).to.equal("5");
        chai.expect(sut.savedGreetings).not.to.be.undefined;
        chai.expect(sut.savedGreetings.length).to.equal(2);
    });

    it("should handle an error response", async () => {
        const httpStub = HttpClientStub.error();
        const sut = new Greetings(httpStub);

        await wait();
        chai.expect(sut.numberOfSavedGreetings).not.to.be.undefined;
        chai.expect(sut.numberOfSavedGreetings).to.equal("0");
        chai.expect(sut.savedGreetings).not.to.be.undefined;
        chai.expect(sut.savedGreetings.length).to.equal(0);
    });

});
