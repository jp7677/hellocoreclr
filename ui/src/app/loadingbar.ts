import * as nprogress from "nprogress";
import "../styles/nprogress.scss";

interface WindowWithLoadingbar extends Window {
    Loadingbar: Loadingbar;
}

export class Loadingbar {
    public static Start(): void {
        Loadingbar.Instance.Start();
    }

    public static Inc(): void {
        Loadingbar.Instance.Inc();
    }

    public static Done(): void {
        Loadingbar.Instance.Done();
    }

    private static get Instance(): Loadingbar {
        // attach this to the window object to make sure that there is really only one.
        const w = (window as unknown) as WindowWithLoadingbar;
        return w.Loadingbar || (w.Loadingbar = new Loadingbar());
    }

    private Start(): void {
        nprogress.configure({
            minimum: 0.3,
            showSpinner: false,
            trickleSpeed: 200
        });
        nprogress.start();
    }

    private Inc(): void {
        nprogress.inc(0.6);
    }

    private Done(): void {
        nprogress.done();
    }
}
