import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BOTTOM_SHEET_SELECTOR } from '../../../crossconcern/utilities/properties/selector.property';
import { LocalStorageRepositoryInterface } from '../../../datastore/local/localstorage.interface';
import { WebsocketService } from '../../../crossconcern/webscoket/websocket.services';
import {UserModel} from '../../../datastore/models/user.model';

@Component({
    selector: BOTTOM_SHEET_SELECTOR,
    templateUrl: './bottomsheet.component.html',
    styleUrls: ['./bottomsheet.scss'],
})
export class BottomSheetComponent {
    public username: string;

    @Input() public users: UserModel[] = [];
    @Input() public round: number;
    @Input() public chooser: UserModel;

    @Output() public onSelectCard: EventEmitter<string> = new EventEmitter();

    constructor(protected router: Router,
                protected websocketService: WebsocketService,
                protected localStorage: LocalStorageRepositoryInterface) {
        this.username = localStorage.getUsername();
    }

    public onLeaveMatchClick() {

    }
}
