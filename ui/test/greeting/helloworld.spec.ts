"use strict";

import {GetHelloWorldResponse} from "../../src/app/greeting/gethelloworldresponse";
import {HelloWorld} from "../../src/app/greeting/helloworld";
import {HttpClientStub} from "../stubs";
import chai from "chai";
import sinon from "sinon";
import toastr from "toastr";

describe("HelloWorldController Test ", () => {

    it("does nothing when there is no input", () => {
        let sut = new HelloWorld(new HttpClientStub());
        sut.submit();
        chai.expect(sut.labelText).to.empty;
    });

    it.skip("can handle a valid response", () => {
        let res = new GetHelloWorldResponse();
        res.name = "Hello World!";
        let httpStub = new HttpClientStub();
        httpStub.responseData = res;

        let toastrSpy = sinon.spy(toastr, "success");
        let sut = new HelloWorld(httpStub);
        sut.inputText = "Hello";

        sut.submit();

        chai.expect(sut.labelText, "Hello World!").to.equals("Hello World!");
        chai.expect(toastrSpy.called).to.true;
    });

    it.skip("can handle an error response", () => {
        let httpStub = new HttpClientStub();

        let toastrSpy = sinon.spy(toastr, "warning");
        let sut = new HelloWorld(httpStub);
        sut.inputText = "Error";

        sut.submit();

        chai.expect(sut.labelText).to.empty;
        chai.expect(toastrSpy.called).to.true;
    });

});
