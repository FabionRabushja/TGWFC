import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HOME_SELECTOR } from '../../../crossconcern/utilities/properties/selector.property';

@Component({
    selector: HOME_SELECTOR,
    templateUrl: './home.component.html',
    styleUrls: ['./home.scss'],
})
export class HomeComponent {

    constructor(protected router: Router) {
    }
}
