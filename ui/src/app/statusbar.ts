declare function require(name: string): string;
import * as nprogress from "nprogress";

interface IWindow extends Window {
    Statusbar: Statusbar;
}

export class Statusbar {
    public static Start(): void {
        Statusbar.Instance.Start();
    }

    public static Inc(): void {
        Statusbar.Instance.Inc();
    }

    public static Done(): void {
        Statusbar.Instance.Done();
    }

    private static get Instance() {
        // attach this to the window object to make sure that there is really only one.
        const w = window as IWindow;
        return w.Statusbar || (w.Statusbar = new this());
    }

    private Start(): void {
        this.loadStylesheet();
        nprogress.configure({
            minimum: 0.3,
            showSpinner: false,
            trickleSpeed: 200
        });
        nprogress.start();
    }

    private loadStylesheet() {
        // tslint:disable:no-submodule-imports
        const css = require("nprogress/nprogress.css").toString();
        const style: HTMLStyleElement = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = css;
        document.head.appendChild(style);
    }

    private Inc(): void {
        nprogress.inc(0.6);
    }

    private Done(): void {
        nprogress.done();
    }
}
