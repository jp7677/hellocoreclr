import * as toastr from "toastr";

export class Notifier {
    constructor() {
        this.SetToastrOptions();
    }

    public Info(message: string): void {
        toastr.success(message);
    }

    public Warn(message: string): void {
        toastr.warning(message, null, { timeOut: 0 });
    }

    private SetToastrOptions(): void {
        toastr.options.positionClass = "toast-bottom-right";
        toastr.options.timeOut = 1500;
        toastr.options.showDuration = 100;
        toastr.options.hideDuration = 250;
    }
}
