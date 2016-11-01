"use strict";

export class Environment {
    public baseUrl: string;

    private applicationMode: string;

    constructor(appsettingsJson) {
        this.baseUrl = appsettingsJson.baseUrl;
        this.applicationMode = appsettingsJson.applicationMode;
    }

    public IsDevelopment(): boolean {
        return this.applicationMode === "Development";
    }

    public IsStaging(): boolean {
        return this.applicationMode === "Staging";
    }

    public IsProduction(): boolean {
        return this.applicationMode === "Production";
    }
}
