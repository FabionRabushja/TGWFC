import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {VIEW_SELECTOR} from '../../../crossconcern/utilities/properties/selector.property';

@Component({
    selector: VIEW_SELECTOR,
    templateUrl: './home.component.html'
})
export class HomeComponent {

    constructor(protected router: Router) {
    }
}
