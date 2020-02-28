export interface LoggerInterface {
    fatal(message: string, args?: object): void;
    error(message: string, args?: object): void;
    warn(message: string, args?: object): void;
    info(message: string, args?: object): void;
    debug(message: string, args?: object): void;
}

export class Logger implements LoggerInterface {
    public fatal(message: string, args?: object): void {
        this.log("fatal", message, "magenta", args);
    }

    public error(message: string, args?: object): void {
        this.log("error", message, "red", args);
    }

    public warn(message: string, args?: object): void {
        this.log("warn", message, "olive", args);
    }

    public info(message: string, args?: object): void {
        this.log("info", message, undefined, args);
    }

    public debug(message: string, args?: object): void {
        this.log("debug", message, "gray", args);
    }

    public static install(Vue): void {
        Vue.prototype.$log = new Logger();
    }

    private log(level: string, message: string, color: string, args: object): void {
        if (color) {
            if (args) {
                // tslint:disable-next-line:no-console
                console.log(`%c${level} | ${message} %o`, `color: ${color}`, args);
            } else {
                // tslint:disable-next-line:no-console
                console.log(`%c${level} | ${message}`, `color: ${color}`);
            }
        } else {
            if (args) {
                // tslint:disable-next-line:no-console
                console.log(`${level} | ${message} %o`, args);
            } else {
                // tslint:disable-next-line:no-console
                console.log(`${level} | ${message}`);
            }
        }
    }
}
