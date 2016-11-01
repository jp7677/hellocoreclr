"use strict";

import {Statusbar} from "../src/app/statusbar";

describe("Statusbar tests", () => {

    it("should start and finish", () => {
        Statusbar.Start();
        Statusbar.Inc();
        Statusbar.Done();
    });

});
