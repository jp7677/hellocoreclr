import * as nprogress from "nprogress";
// tslint:disable:no-submodule-imports
import "../styles/nprogress.scss";

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
        const w = (window as unknown) as IWindow;
        return w.Loadingbar || (w.Loadingbar = new Loadingbar());
    }

    private Start() {
        nprogress.configure({
            minimum: 0.3,
            showSpinner: false,
            trickleSpeed: 200
        });
        nprogress.start();
    }

    private Inc() {
        nprogress.inc(0.6);
    }

    private Done() {
        nprogress.done();
    }
}
