import * as sinon from "sinon";

// tslint:disable:max-classes-per-file

export class HttpClientStub {
    public static ok(responseData: any = {}) {
        const map: Map<string, any> = new Map<string, any>();
        map.set("*", responseData);
        return new HttpClientStub(map, 200);
    }

    public static okWithResponseMap(responseData: Map<string, any>) {
        return new HttpClientStub(responseData, 200);
    }

    public static error() {
        return new HttpClientStub(undefined, 500);
    }

    private success: boolean;

    constructor(private responseData: Map<string, any>, private status: number = 200) {
        this.success = this.status >= 200 && this.status < 400;
    }

    public fetch(url) {
        if (this.success) {
            return Promise.resolve({
                json: () => {
                    if (this.responseData.has("*")) {
                        return Promise.resolve(this.responseData.get("*"));
                    } else {
                        return Promise.resolve(this.responseData.get(url));
                    }
                },
                status: this.status
            });
        }
        return Promise.reject("An error occurred");
    }
}

export class RouterConfigurationStub {
    public title = sinon.stub();
    public map = sinon.stub();
}

export class ValidationControllerStub {

    public static valid() {
        return new ValidationControllerStub(true);
    }

    public static notValid() {
        return new ValidationControllerStub(false);
    }

    constructor(private valid: boolean) {
    }

    public validate() {
        return Promise.resolve({valid: this.valid});
    }
}
