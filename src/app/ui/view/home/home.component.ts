import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HOME_SELECTOR } from '../../../crossconcern/utilities/properties/selector.property';
import { SETUP_PATH } from '../../../crossconcern/utilities/properties/path.property';

@Component({
    selector: HOME_SELECTOR,
    templateUrl: './home.component.html',
    styleUrls: ['./home.scss'],
})
export class HomeComponent {

    constructor(protected router: Router) {
    }

    public onStartGameClick() {
        this.router.navigate(['/' + SETUP_PATH]);
    }
}
