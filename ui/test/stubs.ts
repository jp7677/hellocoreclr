import { LoggerInterface } from "../src/app/logger";

export class LoggerStub {
    public static create(): LoggerInterface {
        return {
            debug: (): void => {
                // ignore
            },
            error: (): void => {
                // ignore
            },
            fatal: (): void => {
                // ignore
            },
            info: (): void => {
                // ignore
            },
            warn: (): void => {
                // ignore
            },
        };
    }
}
