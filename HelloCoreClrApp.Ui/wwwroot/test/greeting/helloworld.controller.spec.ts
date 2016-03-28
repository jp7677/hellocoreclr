/// <reference path="../../../../typings/mocha/mocha.d.ts" />
/// <reference path="../../../../typings/chai/chai.d.ts" />
/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/angularjs/angular-mocks.d.ts" />
"use strict";

describe("HelloWorldController Test ", () => {
    let http;
    let httpBackend;
    let log;

    beforeEach(() => {
        inject( function($http, $httpBackend: ng.IHttpBackendService, $log: ng.ILogService){
            let res = new greeting.GetHelloWorldResponse();
            res.Name = "Hello World!";
            $httpBackend.whenGET("/api/helloworld/Hello").respond(200, res);
            $httpBackend.whenGET("/api/helloworld/Error").respond(500);

            http = $http;
            httpBackend = $httpBackend;
            log = $log;
        });
    });

    it("initializes correctly", () => {
        let sut: greeting.HelloWorldController;
        sut = new greeting.HelloWorldController(http, log);
        sut.inputText = "";
        sut.executeHelloWorld();
    });

    it("can handle a valid response", () => {
        let sut: greeting.HelloWorldController;
        sut = new greeting.HelloWorldController(http, log);
        sut.inputText = "Hello";
        sut.executeHelloWorld();

        httpBackend.flush();
        chai.expect(sut.labelText, "Hello World!").to.equals("Hello World!");
    });

    it("can handle an error response", () => {
        let sut: greeting.HelloWorldController;
        sut = new greeting.HelloWorldController(http, log);
        sut.inputText = "Error";
        sut.executeHelloWorld();

        httpBackend.flush();
        chai.expect(sut.labelText, "").to.equals("");
    });
});
