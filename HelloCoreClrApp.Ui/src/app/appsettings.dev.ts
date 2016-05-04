namespace app {
"use strict";

    // note that the settings below are suitable for hosting from file system in mind
    // they will be recreated during gulp build using the settings in appsettings.json
    angular.module("app")
        .constant("apiBaseUrl", "http://localhost:5000/api/");
}
