import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import {VIEW_SELECTOR} from "../../crossconcern/utilities/properties/selector.property";

@Component({
    selector: VIEW_SELECTOR,
    templateUrl: "./view.component.html"
})
export class ViewComponent {

    constructor(
        protected router: Router,
        protected location: Location) {
    }
}
