import * as sinon from "sinon";

// tslint:disable:max-classes-per-file

export class HttpClientStub {
    public static ok(responseData: any = {}) {
        const map: Map<string, [number, any]> = new Map<string, [number, any]>();
        map.set("*", [200, responseData]);
        return new HttpClientStub(map);
    }

    public static error() {
        const map: Map<string, [number, any]> = new Map<string, [number, any]>();
        map.set("*", [500, undefined]);
        return new HttpClientStub(map);
    }

    public static withResponseMap(responseMap: Map<string, [number, any]>) {
        return new HttpClientStub(responseMap);
    }

    constructor(private responseMap: Map<string, [number, any]>) { }

    public fetch(url) {
        const response = this.responseMap.has("*")
            ? this.responseMap.get("*")
            : this.responseMap.get(url);

        const statusCode = response[0];
        if (statusCode >= 200 && statusCode < 300) {
            return Promise.resolve({
                json: () => {
                    return Promise.resolve(response[1]);
                },
                status: statusCode
            });
        }
        return Promise.reject("An error occurred");
    }
}

export class RouterConfigurationStub {
    public title = sinon.stub();
    public map = sinon.stub();
}

export class ValidationRulesStub {
    public setRules = sinon.stub();
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
