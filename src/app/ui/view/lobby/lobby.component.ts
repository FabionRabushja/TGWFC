import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebsocketService } from '../../../crossconcern/webscoket/websocket.services';
import { UserModel } from '../../../datastore/models/user.model';
import {GAME_PATH, HOME_PATH, LOBBY_LINK_PATH, LOBBY_PATH} from '../../../crossconcern/utilities/properties/path.property';
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
    public host: UserModel;
    public sharedLinkUser: boolean;
    public roomId: string;
    constructor(protected router: Router,
                protected activeRoute: ActivatedRoute,
                protected localStorageRepository: LocalStorageRepositoryInterface,
                protected websocketService: WebsocketService) {
        this.users = [];
    }

    public ngOnInit(): void
    {
        this.activeRoute.params.subscribe(
            (params) =>
            {
                const url = this.activeRoute.snapshot.url[0].path;
                this.roomId = params["id"];
                if (url === LOBBY_PATH)
                {
                    const hostUser = new UserModel({
                        "username": this.localStorageRepository.getUsername()
                    });
                    this.host = hostUser;

                } else if (url === LOBBY_LINK_PATH)
                {
                    this.sharedLinkUser = true;
                }
            }
        );

        const self = this;
        window.onbeforeunload = function()
        {
            self.websocketService.disconnect();
            self.router.navigate(["/" + HOME_PATH]);
        };

        window.onpopstate = function(event)
        {
            self.websocketService.disconnect();
            self.router.navigate(["/" + HOME_PATH]);
        };

        this.websocketService.setupListenerOnJoinRoomReply().subscribe((data) =>
        {
            this.users = data["lobby_users"].map((user) => new UserModel(user));
            this.host = new UserModel(data["room_host"]);
        });

        this.websocketService.setupListenerOnLeaveRoomReply().subscribe((data) =>
        {
            const user = new UserModel(data["user_left"]);
            this.users = this.users.filter((item) => item.uuid !== user.uuid);
            if (data["new_host"])
            {
                this.host = new UserModel(data["new_host"]);
                if (this.host.username === this.localStorageRepository.getUsername()) 
                {
                    this.sharedLinkUser = !this.sharedLinkUser;
                }
            }
        });

        this.websocketService.setupListenerOnUserDisconnected().subscribe((data) =>
        {
            const user = new UserModel(data["user_left"]);
            this.users = this.users.filter((item) => item.uuid !== user.uuid);
        });

        this.websocketService.setupListenerOnStartGameReply().subscribe((data) =>
        {
            logData("DataStartGameReply");
            logData(data);
            let route = this.router.config[0].children.find(r => r.path === GAME_PATH);
            route.data = {
                users: this.users,
                roomId: this.roomId,
                data: data
            };
            this.router.navigateByUrl("/" + GAME_PATH);
        });

        if (this.sharedLinkUser)
        {
            this.joinRoom();
        }
    }

    public joinRoom()
    {
        this.websocketService.joinRoom({
            "username": this.localStorageRepository.getUsername(),
            "room_id" : this.roomId
        });
    }

    public onStartGameClick()
    {
        this.websocketService.startGame({
            "room_id": this.roomId
        });
    }
}
