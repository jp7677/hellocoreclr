import * as toastr from "toastr";

export class Notifier {
    constructor() {
        this.SetToastrOptions();
    }

    public Info(message: string) {
        toastr.success(message);
    }

    public Warn(message: string) {
        toastr.warning(message, null, { timeOut : 0 });
    }

    private SetToastrOptions() {
        toastr.options.positionClass = "toast-bottom-right";
        toastr.options.timeOut = 1500;
        toastr.options.showDuration = 100;
        toastr.options.hideDuration = 250;
    }
}
