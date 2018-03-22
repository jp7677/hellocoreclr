import * as nprogress from "nprogress";

interface IWindow extends Window {
    Loadingbar: Loadingbar;
}

export class Loadingbar {
    public static Start() {
        Loadingbar.Instance.Start();
    }

    public static Inc() {
        Loadingbar.Instance.Inc();
    }

    public static Done() {
        Loadingbar.Instance.Done();
    }

    private static get Instance(): Loadingbar {
        // attach this to the window object to make sure that there is really only one.
        const w = window as IWindow;
        return w.Loadingbar || (w.Loadingbar = new Loadingbar());
    }

    private Start() {
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

    private Inc() {
        nprogress.inc(0.6);
    }

    private Done() {
        nprogress.done();
    }
}
