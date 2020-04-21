import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HOME_SELECTOR } from '../../../crossconcern/utilities/properties/selector.property';
import { SETTINGS_PATH, SETUP_PATH, SHARE_PATH, LOBBY_LINK_PATH } from '../../../crossconcern/utilities/properties/path.property';
import { WebsocketService } from '../../../crossconcern/webscoket/websocket.services';
import { LocalStorageRepositoryInterface } from '../../../datastore/local/localstorage.interface';

@Component({
    selector: HOME_SELECTOR,
    templateUrl: './home.component.html',
    styleUrls: ['./home.scss'],
})
export class HomeComponent implements OnInit{

    public showUsernameDialog: boolean = false;
    public showAddLinkDialog: boolean = false;
    public sharedLinkId: string;
    public onParticipate: boolean;
    constructor(protected router: Router,
                protected activeRoute: ActivatedRoute,
                protected localStorageRepository: LocalStorageRepositoryInterface,
                protected websocketService: WebsocketService) {
    }

    public ngOnInit(): void {
        this.websocketService.setupSocketConnection();
        this.activeRoute.params.subscribe(
            (params) => {
                const url = this.activeRoute.snapshot.url[0].path;
                if (url === SHARE_PATH) {
                    this.sharedLinkId = params["id"];
                    this.onSharedLinkClick();
                }
            }
        );
    }

    public checkUsername(): boolean{
        return this.localStorageRepository.getUsername() !== null && typeof this.localStorageRepository.getUsername() !== undefined;
    }

    public setUsername(event) {
        if (event !== "" && event !== null) { 
            this.localStorageRepository.setUsername(event);
            this.showUsernameDialog = false;
            if (this.sharedLinkId !== null && typeof this.sharedLinkId !== "undefined") {
                this.router.navigate(["/" + LOBBY_LINK_PATH + "/" + this.sharedLinkId]);
            } else if (this.onParticipate) {
                this.showAddLinkDialog = true;
            } else {
                this.router.navigate(['/' + SETUP_PATH]);
            }
        }
    }

    public setLobbyLink(url: string) {
        if (url !== "" && url !== null) {
            this.showAddLinkDialog = false;
           //this.router.navigate(["/" + LOBBY_PATH + "/" + this.sharedLinkId]);
        }
    }

    public onSharedLinkClick() {
        if (this.checkUsername()) {
            this.joinRoom();
            this.router.navigate(["/" + LOBBY_LINK_PATH + "/" + this.sharedLinkId]);
        } else {
            this.showUsernameDialog = true;
        }
    }

    public joinRoom() {
        this.websocketService.joinRoom({
            "username": this.localStorageRepository.getUsername(),
            "room_id" : this.sharedLinkId.toString()
        });
    }

    public onParticipateClick() {
        this.onParticipate = true;
        if (this.checkUsername()) {
            this.showAddLinkDialog = true;
        } else {
            this.showUsernameDialog = true;
        }
    }

    public onStartGameClick() {
        this.onParticipate = false;
        if (this.checkUsername()) {
            this.router.navigate(['/' + SETUP_PATH]);
        } else {
            this.showUsernameDialog = true;
        }
    }

    public onSettingsClick() {
        this.router.navigate(['/' + SETTINGS_PATH]);
    }

}
