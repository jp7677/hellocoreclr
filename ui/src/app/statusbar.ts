declare function require(name: string): string;
import * as nprogress from "nprogress";

export class Statusbar {
    public static Start(): void {
        Statusbar.loadStylesheet();
        nprogress.configure({
            minimum: 0.3,
            showSpinner: false,
            trickleSpeed: 200
        });
        nprogress.start();
    }

    public static Inc(): void {
        nprogress.inc(0.6);
    }

    public static Done(): void {
        nprogress.done();
    }

    private static loadStylesheet() {
        const css = require("nprogress/nprogress.css").toString();
        const style: HTMLStyleElement = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = css;
        document.head.appendChild(style);
    }
}
