import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SETTINGS_SELECTOR } from '../../../crossconcern/utilities/properties/selector.property';
import {LocalStorageRepositoryInterface} from '../../../datastore/local/localstorage.interface';
import {HOME_PATH} from '../../../crossconcern/utilities/properties/path.property';

@Component({
    selector: SETTINGS_SELECTOR,
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.scss'],
})
export class SettingsComponent {
    public username: string;

    constructor(protected router: Router,
                protected localStorage: LocalStorageRepositoryInterface) {
        this.username = localStorage.getUsername();
    }

    public onConfirmClick() {
        this.localStorage.setUsername(this.username);
        this.router.navigate(["/" + HOME_PATH]);
    }
}
