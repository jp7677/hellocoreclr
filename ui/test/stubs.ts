"use strict";

import sinon from "sinon";

// tslint:disable:max-classes-per-file

export class HttpClientStub {
    public static ok(responseData: any = {}) {
        return new HttpClientStub(responseData, 200);
    }

    public static error() {
        return new HttpClientStub(undefined, 500);
    }

    private success: boolean;

    constructor(private responseData: any = {}, private status: number = 200) {
        this.success = this.status >= 200 && this.status < 400;
    }

    public fetch (url) {
        if (this.success) {
            return Promise.resolve({
                json: () => Promise.resolve(this.responseData),
                status: this.status
            });
        }
        return Promise.reject("An error occured");
    }
}

export class RouterConfigurationStub {
    public title = sinon.stub();
    public map = sinon.stub();
}
