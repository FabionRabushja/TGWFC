import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { HOME_SELECTOR } from '../../../crossconcern/utilities/properties/selector.property';
import {SETTINGS_PATH, SETUP_PATH} from '../../../crossconcern/utilities/properties/path.property';
import {WebsocketService} from '../../../crossconcern/webscoket/websocket.services';

@Component({
    selector: HOME_SELECTOR,
    templateUrl: './home.component.html',
    styleUrls: ['./home.scss'],
})
export class HomeComponent {

    constructor(protected router: Router,
                protected websocketService: WebsocketService) {
    }

    public onStartGameClick() {
        this.websocketService.setupSocketConnection();
        this.router.navigate(['/' + SETUP_PATH]);
    }

    public onSettingsClick() {
        this.router.navigate(['/' + SETTINGS_PATH]);
    }
}
