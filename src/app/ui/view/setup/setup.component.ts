import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SETUP_SELECTOR } from '../../../crossconcern/utilities/properties/selector.property';
import { GameManager } from '../../../crossconcern/managers/game.manager';
import { PackModel } from '../../../datastore/models/pack.model';
import { Location } from "@angular/common";
import { WebsocketService } from '../../../crossconcern/webscoket/websocket.services';
import { LocalStorageRepositoryInterface } from '../../../datastore/local/localstorage.interface';
import { LOBBY_PATH } from '../../../crossconcern/utilities/properties/path.property';
import {logData} from '../../../crossconcern/helpers/generic/generic.helper';

@Component({
    selector: SETUP_SELECTOR,
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.scss'],
})
export class SetupComponent implements OnInit{

    public packs: PackModel[];
    public rounds: any[];
    public selectedRound: any;
    public nothingSelected: boolean;

    constructor(protected router: Router,
                protected location: Location,
                protected websocketService: WebsocketService,
                protected localstorageRepository: LocalStorageRepositoryInterface,
                protected gameManager: GameManager) {
        this.packs = [];
        this.rounds = [];
        for (let i=5 ; i<=30 ; i+=5) {
            this.rounds.push({id: i, name: i});
        }
        this.selectedRound = 5;
    }

    public ngOnInit(): void {
        this.gameManager.getPacks().subscribe((packs: PackModel[]) => {
            this.packs = [...packs];
            this.websocketService.setupListenerOnCreateRoom().subscribe((value) => {
                this.router.navigate(["/" + LOBBY_PATH + "/" + value["room"].id]);
            });
        })
    }

    public onPackSelect(pack: PackModel) {
        if (this.nothingSelected && !pack.clicked) {
            this.nothingSelected = false;
        }
        this.packs.find((item) => item === pack).clicked = !pack.clicked;
    }

    public onStartGame() {
        let packs = this.packs.filter((pack) => pack.clicked == true);

        if (packs.length >= 1) {
            const username = this.localstorageRepository.getUsername();
            let packsId: string[] = [];
            packs.forEach((pack) => {
                packsId.push(pack.id);
            });
            this.websocketService.createRoom({
                "username": username,
                "number_of_rounds": this.selectedRound,
                "packs": packsId
            });
        } else {
            this.nothingSelected = true;
        }
    }

    public onGoBack() {
        this.location.back();
    }

}
