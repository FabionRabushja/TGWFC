import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Router } from '@angular/router';
import { ALERT_SELECTOR } from '../../../crossconcern/utilities/properties/selector.property';
import {LocalStorageRepositoryInterface} from '../../../datastore/local/localstorage.interface';
import {WebsocketService} from '../../../crossconcern/webscoket/websocket.services';
import {HOME_PATH} from '../../../crossconcern/utilities/properties/path.property';
import {UserModel} from '../../../datastore/models/user.model';

@Component({
    selector: ALERT_SELECTOR,
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.scss'],
})
export class AlertComponent {

    @Input() public user: UserModel;
    @Input() public showButton: string;
    @Input() public round: boolean;
    @Input() public game: boolean;
    @Input() public iAmWinner: boolean;

    @Output() public onConfirm: EventEmitter<string> = new EventEmitter();

    constructor(protected router: Router,
                protected websocketService: WebsocketService,
                protected localStorage: LocalStorageRepositoryInterface) {
    }

    public onExitMatch() {
        this.websocketService.disconnect();
        this.router.navigate(["/" + HOME_PATH]);
    }
}
