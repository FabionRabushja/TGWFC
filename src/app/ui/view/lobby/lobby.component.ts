import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebsocketService } from '../../../crossconcern/webscoket/websocket.services';
import { UserModel } from '../../../datastore/models/user.model';
import { GAME_PATH, LOBBY_LINK_PATH, LOBBY_PATH } from '../../../crossconcern/utilities/properties/path.property';
import { LOBBY_SELECTOR } from '../../../crossconcern/utilities/properties/selector.property';
import {LocalStorageRepositoryInterface} from '../../../datastore/local/localstorage.interface';
import {logData} from '../../../crossconcern/helpers/generic/generic.helper';

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

        const self = this;
        window.onbeforeunload = function() {
            self.websocketService.disconnect();
        };

        window.onpopstate = function(event) {
            self.websocketService.disconnect();
        };

        this.websocketService.setupListenerOnJoinRoomReply().subscribe((data) => {
            this.users = [];
            data["lobby_users"].forEach((user) => {
                logData(user);
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

        this.websocketService.setupListenerOnStartGameReply().subscribe((data) => {
            let route = this.router.config[0].children.find(r => r.path === GAME_PATH);
            route.data = {
                users: this.users,
                roomId: this.roomId,
                data: data
            };
            this.router.navigateByUrl("/" + GAME_PATH);
        })
    }

    public onStartGameClick() {
        this.websocketService.startGame({
            "room_id": this.roomId
        });
    }
}
