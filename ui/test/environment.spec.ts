import { Environment } from "../src/app/environment";

describe("Environment test suite", () => {
    it("should initialize correctly", () => {
        const sut = new Environment({ baseUrl: "api" }, "appMode");

        expect(sut.applicationMode).toEqual("appMode");
        expect(sut.baseUrl).toEqual("api");
        expect(sut.IsDevelopment()).toEqual(false);
        expect(sut.IsStaging()).toEqual(false);
        expect(sut.IsProduction()).toEqual(false);
    });

    it("should detect development", () => {
        const sut = new Environment({ baseUrl: "" }, "Development");

        expect(sut.IsDevelopment()).toEqual(true);
        expect(sut.IsStaging()).toEqual(false);
        expect(sut.IsProduction()).toEqual(false);
    });

    it("should detect staging", () => {
        const sut = new Environment({ baseUrl: "" }, "Staging");

        expect(sut.IsDevelopment()).toEqual(false);
        expect(sut.IsStaging()).toEqual(true);
        expect(sut.IsProduction()).toEqual(false);
    });

    it("should detect production", () => {
        const sut = new Environment({ baseUrl: "" }, "Production");

        expect(sut.IsDevelopment()).toEqual(false);
        expect(sut.IsStaging()).toEqual(false);
        expect(sut.IsProduction()).toEqual(true);
    });
});
