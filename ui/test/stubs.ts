"use strict";

export class HttpClientStub {
    public responseData: any;

    public fetch (url) {
        return new Promise(resolve => {
            resolve({
                json: () => this.responseData
            });
        });
    }
}
