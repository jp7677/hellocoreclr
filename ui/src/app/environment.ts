import { Appsettings } from "./appsettings";

export class Environment {
    public applicationMode: string;
    public baseUrl: string;

    constructor(appsettings: Appsettings, applicationMode: string) {
        this.applicationMode = applicationMode;
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
