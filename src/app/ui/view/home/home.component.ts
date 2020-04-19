import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HOME_SELECTOR } from '../../../crossconcern/utilities/properties/selector.property';
import {LOBBY_PATH, SETTINGS_PATH, SETUP_PATH, SHARE_PATH} from '../../../crossconcern/utilities/properties/path.property';
import {WebsocketService} from '../../../crossconcern/webscoket/websocket.services';
import {logData} from '../../../crossconcern/helpers/generic/generic.helper';
import {LocalStorageRepositoryInterface} from '../../../datastore/local/localstorage.interface';

@Component({
    selector: HOME_SELECTOR,
    templateUrl: './home.component.html',
    styleUrls: ['./home.scss'],
})
export class HomeComponent implements OnInit{

    public showUsernameDialog: boolean = false;
    public showAddLinkDialog: boolean = false;
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
                    this.onSharelinkClick(params['id']);
                }
            }
        );
    }

    public onSharelinkClick(id: string) {
        if (this.localStorageRepository.getUsername() !== null && typeof this.localStorageRepository.getUsername() !== "undefined"){
            this.router.navigate(["/" + LOBBY_PATH + "/" + id]);
        } else {
            this.showUsernameDialog = true;
        }
    }

    public onConfirmClick(event) {

    }

    public onParticipateClick() {

    }

    public onStartGameClick() {
        this.router.navigate(['/' + SETUP_PATH]);
    }

    public onSettingsClick() {
        this.router.navigate(['/' + SETTINGS_PATH]);
    }
}
