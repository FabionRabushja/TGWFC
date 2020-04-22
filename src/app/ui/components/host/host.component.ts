import {Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { HOST_SELECTOR } from '../../../crossconcern/utilities/properties/selector.property';
import { LocalStorageRepositoryInterface } from '../../../datastore/local/localstorage.interface';
import {WebsocketService} from '../../../crossconcern/webscoket/websocket.services';
import {UserModel} from '../../../datastore/models/user.model';
import {HOME_PATH} from '../../../crossconcern/utilities/properties/path.property';

@Component({
    selector: HOST_SELECTOR,
    templateUrl: './host.component.html',
    styleUrls: ['./host.scss'],
})
export class HostComponent {
    public username: string;

    @Input() public host: UserModel;
    @Input() public roomId: string;

    constructor(protected router: Router,
                protected websocketService: WebsocketService,
                protected localStorage: LocalStorageRepositoryInterface) {
        this.username = localStorage.getUsername();
    }

    public onLeaveMatchClick() {
        this.websocketService.leaveRoom({
            "room_id": this.roomId
        });
        this.websocketService.disconnect();
        this.router.navigate(["/" + HOME_PATH]);
    }

    public onCopyMatchLinkClick(event) {
        const shareLink = window.location.href.replace("lobby-link", "share").replace("lobby", "share");
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = shareLink;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }
}
