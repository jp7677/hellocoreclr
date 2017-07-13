import {Greetings} from "../../src/app/helloworld/greetings";
import {SavedGreeting} from "../../src/app/helloworld/messages/savedgreeting";
import {HttpClientStub} from "../stubs";

function wait() {
    return new Promise((resolve, reject) => {
            setTimeout(resolve, 200);
        });
}

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

        await wait();
        expect(sut.numberOfSavedGreetings).not.toBeUndefined();
        expect(sut.numberOfSavedGreetings).toBe("5");
        expect(sut.savedGreetings).not.toBeUndefined();
        expect(sut.savedGreetings.length).toBe(2);
    });

    it("should handle an error response", async () => {
        const httpStub = HttpClientStub.error();
        const sut = new Greetings(httpStub);

        await wait();
        expect(sut.numberOfSavedGreetings).not.toBeUndefined();
        expect(sut.numberOfSavedGreetings).toBe("0");
        expect(sut.savedGreetings).not.toBeUndefined();
        expect(sut.savedGreetings.length).toBe(0);
    });

});
