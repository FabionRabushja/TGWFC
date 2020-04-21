import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GAME_SELECTOR } from '../../../crossconcern/utilities/properties/selector.property';
import { WebsocketService } from '../../../crossconcern/webscoket/websocket.services';
import { LocalStorageRepositoryInterface } from '../../../datastore/local/localstorage.interface';
import {logData} from '../../../crossconcern/helpers/generic/generic.helper';
import {UserModel} from '../../../datastore/models/user.model';
import {CardModel} from '../../../datastore/models/card.model';

@Component({
    selector: GAME_SELECTOR,
    templateUrl: './game.component.html',
    styleUrls: ['./game.scss'],
})
export class GameComponent implements OnInit{

    public users: UserModel[];
    public roomId: string;
    public cards: CardModel[] = [];
    public cardToShow: CardModel;
    public cardSelected: boolean = false;
    public host: UserModel;
    public iAmChooser: boolean = false;
    public chooser: UserModel;
    public round: number;
    public showSelectButton: boolean = true;

    constructor(protected router: Router,
                protected activeRoute: ActivatedRoute,
                protected websocketService: WebsocketService) {
        this.users = [];
    }

    public ngOnInit(): void {
        this.activeRoute.data.subscribe(
            (params) => {
                this.users = params["users"];
                this.roomId = params["roomId"];
                this.iAmChooser = params["data"]["i_am_chooser"];
                this.cardToShow = new CardModel({
                    "userId": null,
                    "card": params["data"]["card_to_show"]
                });
                this.chooser = new UserModel(params["data"]["chooser"]);
                this.round = params["data"]["round"];
                if (!this.iAmChooser) {
                    if (params["data"]["cards"]) {
                        params["data"]["cards"].forEach((card) => {
                            this.cards.push(new CardModel(card));
                        });
                    }
                }
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
            if(data["user_left"]) {
                const user = new UserModel(data["user_left"]);
                this.users = this.users.filter((item) => item === user);
            }
        });

        this.websocketService.setupListenerOnLeaveRoomReply().subscribe((data) =>{
            if (data["new_host"]) {
                this.host = new UserModel(data["new_host"]);
            }
            if(data["user_left"]) {
                const user = new UserModel(data["user_left"]);
                this.users = this.users.filter((item) => item === user);
            }
        });

        this.websocketService.setupListenerOnChosenCardReply().subscribe((data) =>{
            if (data["chosen_cards"]) {
                if (data["chosen_cards"].length === this.users.length){
                    this.cards = [];
                    data["chosen_cards"].forEach((card) => {
                        this.cards.push(new CardModel(
                            {
                                "userId": card["userId"],
                                "card" : card["card"]["card"]
                            }));
                    });
                    this.showSelectButton = this.iAmChooser;
                } else {
                    if (this.cardSelected || this.iAmChooser) {
                        this.cards = [];
                        const emptyCard = new CardModel({
                            "userId": "",
                            "card" : ""
                        });
                        data["chosen_cards"].forEach((card) => {
                            this.cards.push(emptyCard);
                            this.showSelectButton = false;
                        });
                    }
                }
            }
        });

        this.websocketService.setupListenerOnSelectedWinnerReply().subscribe((data) => {
            logData(data);
        });
    }

    public onSelectCardClick(card: CardModel) {
        if (this.iAmChooser) {
            this.websocketService.chosenSelectedWinner({
                "room_id": this.roomId,
                "winner_card": card
            })
        } else {
            this.websocketService.chosenCard({
                "room_id": this.roomId,
                "chosen_card": {
                    "card": card
                }
            });
            this.cardSelected = true;
        }
    }
}
