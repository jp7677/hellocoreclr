import * as sinon from "sinon";

// tslint:disable:max-classes-per-file

export class LoggerStub {
    public static create() {
        return {
            debug: () => {
                // ignore
            },
            error: () => {
                // ignore
            },
            fatal: () => {
                // ignore
            },
            info: () => {
                // ignore
            },
            warn: () => {
                // ignore
            }
        };
    }
}
