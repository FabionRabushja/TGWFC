import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { LOBBY_SELECTOR } from '../../../crossconcern/utilities/properties/selector.property';
import {WebsocketService} from '../../../crossconcern/webscoket/websocket.services';
import {logData} from '../../../crossconcern/helpers/generic/generic.helper';
import {UserModel} from '../../../datastore/models/user.model';
import {LOBBY_LINK_PATH, LOBBY_PATH, SHARE_PATH} from '../../../crossconcern/utilities/properties/path.property';
import {LocalStorageRepositoryInterface} from '../../../datastore/local/localstorage.interface';

@Component({
    selector: LOBBY_SELECTOR,
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.scss'],
})
export class LobbyComponent implements OnInit{

    public users: UserModel[];
    public host: string;
    public sharedLinkUser: boolean;
    public roomId: string;
    constructor(protected router: Router,
                protected activeRoute: ActivatedRoute,
                protected localStorageRepository: LocalStorageRepositoryInterface,
                protected websocketService: WebsocketService) {
        this.users = [];
    }

    public ngOnInit(): void {
        this.activeRoute.params.subscribe(
            (params) => {
                const url = this.activeRoute.snapshot.url[0].path;
                this.roomId = params["id"];
                if (url === LOBBY_PATH) {
                    this.host = this.localStorageRepository.getUsername();
                } else if (url === LOBBY_LINK_PATH) {
                    this.sharedLinkUser = true;
                }
            }
        );

        this.websocketService.setupListenerOnJoinRoomReply().subscribe((data) => {
            logData(data);
            data["lobby_users"].forEach((user) => {
                const userModel = new UserModel(user);
                if (!userModel.host) {
                    this.users.push(user);
                } else {
                    this.host = userModel.username;
                }
            });
        });

        this.websocketService.setupListenerOnLeaveRoomReply().subscribe((data) =>{
            logData("LeaveRoom");
            logData(data);
        });

        this.websocketService.setupListenerOnUserDisconnected().subscribe((data) => {
            const user = new UserModel(data["user_left"]);
            this.users = this.users.filter((item) => item === user);
        });
    }
}
