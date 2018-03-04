import {Loadingbar} from "../src/app/loadingbar";

describe("Statusbar test suite", () => {

    it("should start and finish", () => {
        Loadingbar.Start();
        Loadingbar.Inc();
        Loadingbar.Done();
    });

});
