import {Config} from "../src/app/config";

describe("Config test suite", () => {

    it("should initialize correctly", () => {
        const routerConfiguration = jasmine.createSpyObj("RouterConfiguration", ["title", "map"]);
        const sut = new Config();

        sut.configureRouter(routerConfiguration);

        expect(routerConfiguration.title).toBe("Hello World");
        expect(routerConfiguration.map).toHaveBeenCalled();
    });

});
