import Vue from "vue";

declare module "vue/types/vue" {
    export interface Vue {
        $log: {
            fatal(message: string, args?: object): void;
            error(message: string, args?: object): void;
            warn(message: string, args?: object): void;
            info(message: string, args?: object): void;
            debug(message: string, args?: object): void;
        };
    }
}
