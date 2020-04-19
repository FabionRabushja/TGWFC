import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { LOBBY_SELECTOR } from '../../../crossconcern/utilities/properties/selector.property';
import {WebsocketService} from '../../../crossconcern/webscoket/websocket.services';

@Component({
    selector: LOBBY_SELECTOR,
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.scss'],
})
export class LobbyComponent {

    constructor(protected router: Router,
                protected websocketService: WebsocketService) {
    }
}
