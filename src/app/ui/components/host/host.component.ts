import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Router } from '@angular/router';
import {DIALOG_SELECTOR} from '../../../crossconcern/utilities/properties/selector.property';
import {LocalStorageRepositoryInterface} from '../../../datastore/local/localstorage.interface';

@Component({
    selector: DIALOG_SELECTOR,
    templateUrl: './host.component.html',
    styleUrls: ['./host.scss'],
})
export class HostComponent {
    public username: string;

    @Input() public label: string;
    @Input() public value: string;

    @Output() public onConfirm: EventEmitter<string> = new EventEmitter();

    constructor(protected router: Router,
                protected localStorage: LocalStorageRepositoryInterface) {
        this.username = localStorage.getUsername();
    }

    public onConfirmClick(){
        if (this.value !== "") {
            this.onConfirm.emit(this.value);
        }
    }
}
