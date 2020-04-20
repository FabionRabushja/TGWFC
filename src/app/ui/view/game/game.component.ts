import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GAME_SELECTOR } from '../../../crossconcern/utilities/properties/selector.property';
import { WebsocketService } from '../../../crossconcern/webscoket/websocket.services';
import { LocalStorageRepositoryInterface } from '../../../datastore/local/localstorage.interface';
import {logData} from '../../../crossconcern/helpers/generic/generic.helper';
import {UserModel} from '../../../datastore/models/user.model';

@Component({
    selector: GAME_SELECTOR,
    templateUrl: './game.component.html',
    styleUrls: ['./game.scss'],
})
export class GameComponent implements OnInit{

    public users: UserModel[];
    public roomId: string;

    constructor(protected router: Router,
                protected activeRoute: ActivatedRoute,
                protected localStorageRepository: LocalStorageRepositoryInterface,
                protected websocketService: WebsocketService) {
        this.users = [];
    }

    public ngOnInit(): void {
        this.activeRoute.data.subscribe(
            (params) => {
                this.users = params["users"];
                this.roomId = params["roomId"];
                logData(params);
            }
        );

        const self = this;
        window.onbeforeunload = function() {
            self.websocketService.disconnect()
        };

        window.onpopstate = function(event) {
            logData("tre");
            self.websocketService.disconnect();
        };

        this.websocketService.setupListenerOnUserDisconnected().subscribe((data) => {
            const user = new UserModel(data["user_left"]);
            this.users = this.users.filter((item) => item === user);
        });
    }
}
