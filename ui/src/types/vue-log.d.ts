import Vue from "vue";

declare module "vue/types/vue" {
    export interface Vue {
        $log: {
            fatal(message: string, args?: any): void;
            error(message: string, args?: any): void;
            warn(message: string, args?: any): void;
            info(message: string, args?: any): void;
            debug(message: string, args?: any): void;
        };
    }
}
