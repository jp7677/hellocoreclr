"use strict";

import {Statusbar} from "../src/app/statusbar";

describe("Statusbar test suite", () => {

    it("should start and finish", () => {
        Statusbar.Start();
        Statusbar.Inc();
        Statusbar.Done();
    });

});
