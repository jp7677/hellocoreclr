declare var APPLICATIONMODE: string;

export class Environment {
    public applicationMode: string;
    public baseUrl: string;

    constructor(appsettings) {
        this.applicationMode = APPLICATIONMODE;
        this.baseUrl = appsettings.baseUrl;
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
