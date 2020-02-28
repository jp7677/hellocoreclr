export class Logger {
    public fatal(message: string, args: any) {
        this.log("fatal", message, "magenta", args);
    }

    public error(message: string, args: any) {
        this.log("error", message, "red", args);
    }

    public warn(message: string, args: any) {
        this.log("warn", message, "olive", args);
    }

    public info(message: string, args: any) {
        this.log("info", message, undefined, args);
    }

    public debug(message: string, args: any) {
        this.log("debug", message, "gray", args);
    }

    public static install(Vue, options) {
        Vue.prototype.$log = new Logger();
    }

    private log(level: string, message: string, color: string, args: any) {
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
