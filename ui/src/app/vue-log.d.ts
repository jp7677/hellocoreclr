import Vue from "vue";

declare module "vue/types/vue" {
  export interface VueConstructor<V extends Vue = Vue> {
    $log: {
      debug(...args: any[]): void;
      info(...args: any[]): void;
      warn(...args: any[]): void;
      error(...args: any[]): void;
      fatal(...args: any[]): void;
    };
  }
  export interface Vue {
		$log: {
			debug(...args: any[]): void;
			info(...args: any[]): void;
			warn(...args: any[]): void;
			error(...args: any[]): void;
			fatal(...args: any[]): void;
		};
	}
}
