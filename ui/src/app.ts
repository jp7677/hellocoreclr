"use strict";

import "bootstrap/css/bootstrap.css!";
import "bootstrap/css/bootstrap-theme.css!";
import "font-awesome/css/font-awesome.css!";
import "toastr/build/toastr.css!";
import "styles.css!";

import angular from "angular";
import "angular-bootstrap";
import "angular-ui-router";

import * as main from "./main";

angular.element(document).ready(function (): void {
  angular.bootstrap(document, [main.name], {
    strictDi: true
  });
});
