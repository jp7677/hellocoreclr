"use strict";

import {Statusbar} from "../src/app/statusbar";

describe("Statusbar Test ", () => {

    it("should start and finish", () => {
        Statusbar.Start();
        Statusbar.Inc();
        Statusbar.Done();
    });

});
