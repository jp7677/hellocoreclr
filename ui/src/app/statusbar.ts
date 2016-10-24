"use strict";

import * as nprogress from "nprogress";

export class Statusbar {
    public static Start(): void {
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
}
