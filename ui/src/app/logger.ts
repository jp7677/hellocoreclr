export interface LoggerInterface {
    fatal(message: string, args?: any): void;
    error(message: string, args?: any): void;
    warn(message: string, args?: any): void;
    info(message: string, args?: any): void;
    debug(message: string, args?: any): void;
}

export class Logger implements LoggerInterface {
    public fatal(message: string, args?: any): void {
        this.log("fatal", message, "magenta", args);
    }

    public error(message: string, args?: any): void {
        this.log("error", message, "red", args);
    }

    public warn(message: string, args?: any): void {
        this.log("warn", message, "olive", args);
    }

    public info(message: string, args?: any): void {
        this.log("info", message, undefined, args);
    }

    public debug(message: string, args?: any): void {
        this.log("debug", message, "gray", args);
    }

    public static install(Vue): void {
        Vue.prototype.$log = new Logger();
    }

    private log(level: string, message: string, color: string, args: any): void {
        if (color) {
            if (args) {
                console.log(`%c${level} | ${message} %o`, `color: ${color}`, args);
            } else {
                console.log(`%c${level} | ${message}`, `color: ${color}`);
            }
        } else {
            if (args) {
                console.log(`${level} | ${message} %o`, args);
            } else {
                console.log(`${level} | ${message}`);
            }
        }
    }
}
