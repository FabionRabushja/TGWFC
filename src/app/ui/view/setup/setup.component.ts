import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SETUP_SELECTOR} from '../../../crossconcern/utilities/properties/selector.property';
import {SETUP_PATH, VIEW_PATH} from '../../../crossconcern/utilities/properties/path.property';

@Component({
    selector: SETUP_SELECTOR,
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.scss'],
})
export class SetupComponent {

    constructor(protected router: Router) {
    }

    public onStartGameClick() {
        this.router.navigate([VIEW_PATH + '/' + SETUP_PATH]);
    }
}
