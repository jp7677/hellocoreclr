"use strict";

export class Environment {
    private applicationMode: string;

    constructor(appsettingsJson) {
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
