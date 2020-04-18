import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {VIEW_SELECTOR} from '../../crossconcern/utilities/properties/selector.property';

@Component({
    selector: VIEW_SELECTOR,
    templateUrl: './view.component.html',
    styleUrls: ['./view.scss']
})
export class ViewComponent {

    constructor(protected router: Router) {
    }
}
