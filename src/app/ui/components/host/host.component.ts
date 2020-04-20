import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { HOST_SELECTOR } from '../../../crossconcern/utilities/properties/selector.property';
import { LocalStorageRepositoryInterface } from '../../../datastore/local/localstorage.interface';

@Component({
    selector: HOST_SELECTOR,
    templateUrl: './host.component.html',
    styleUrls: ['./host.scss'],
})
export class HostComponent {
    public username: string;

    @Input() public host: string;

    constructor(protected router: Router,
                protected localStorage: LocalStorageRepositoryInterface) {
        this.username = localStorage.getUsername();
    }

    public onCopyMatchLinkClick(){

    }

    public onLeaveMatchClick(){

    }
}
