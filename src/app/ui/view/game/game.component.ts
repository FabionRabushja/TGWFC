import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GAME_SELECTOR } from '../../../crossconcern/utilities/properties/selector.property';
import { WebsocketService } from '../../../crossconcern/webscoket/websocket.services';
import { LocalStorageRepositoryInterface } from '../../../datastore/local/localstorage.interface';
import {logData} from '../../../crossconcern/helpers/generic/generic.helper';
import {UserModel} from '../../../datastore/models/user.model';
import {CardModel} from '../../../datastore/models/card.model';
import {trigger, transition, style, animate, state} from '@angular/animations';
import {HOME_PATH} from '../../../crossconcern/utilities/properties/path.property';

@Component({
    selector: GAME_SELECTOR,
    templateUrl: './game.component.html',
    styleUrls: ['./game.scss'],
    animations: [
        trigger('expandableState', [
            state("true", style({ bottom: '0' })),
            state("false", style({ bottom: '-300px' })),
            transition("false <=> true", animate(500))
        ])
    ],
})
export class GameComponent implements OnInit{

    public users: UserModel[];
    public roomId: string;
    public cards: CardModel[] = [];
    public cardToShow: CardModel;
    public cardSelected = false;
    public host: UserModel;
    public iAmChooser: false;
    public chooser: UserModel;
    public round: number;
    public showSelectButton: boolean = true;
    public allUsersChose: boolean = false;
    public bottomSheetToggle : boolean = false;
    public gameFinished: boolean = false;
    public roundWinner: UserModel;
    public gameWinner: UserModel;
    public showRoundWinner: boolean = false;
    public showGameWinner: boolean = false;
    public iAmWinner: boolean = false;

    constructor(protected router: Router,
                protected activeRoute: ActivatedRoute,
                protected localStorage: LocalStorageRepositoryInterface,
                protected websocketService: WebsocketService) {
        this.users = [];
    }

    public ngOnInit(): void {
        this.activeRoute.data.subscribe(
            (params) =>
            {
                this.users = params.users;
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

        this.websocketService.setupListenerOnUserDisconnected().subscribe((data) =>
        {
            if(data["user_left"]) {
                const user = new UserModel(data["user_left"]);
                this.users = this.users.filter((item) => item === user);
                if (this.users.length === 1) {
                    this.websocketService.disconnect();
                    this.router.navigate(["/" + HOME_PATH]);
                }
            }
        });

        this.websocketService.setupListenerOnLeaveRoomReply().subscribe((data) =>
        {
            if (data["new_host"])
            {
                this.host = new UserModel(data["new_host"]);
            }
            if(data["user_left"])
            {
                const user = new UserModel(data["user_left"]);
                this.users = this.users.filter((item) => item === user);
            }
        });

        this.websocketService.setupListenerOnChosenCardReply().subscribe((data) =>
        {
            if (data["chosen_cards"])
            {
                if (data["chosen_cards"].length === this.users.length - 1)
                {
                    this.cards = [];
                    this.allUsersChose = true;
                    data["chosen_cards"].forEach((card) =>
                    {
                        logData("Chosen Cards");
                        logData(card);
                        this.cards.push( new CardModel({
                                "userId": card["userId"],
                                "card" : card["card"]
                            }));
                    });
                    this.showSelectButton = this.iAmChooser;
                } else
                {
                    logData("empty Card");
                    if (this.cardSelected || this.iAmChooser)
                    {
                        this.cards = [];
                        const emptyCard = new CardModel({
                            "userId": "",
                            "card" : ""
                        });
                        this.cards = data["chosen_cards"].map(card => emptyCard);
                        /*data["chosen_cards"].forEach((card) => {
                            this.cards.push(emptyCard);
                        });*/
                        this.showSelectButton = false;
                    }
                }
            }
        });

        this.websocketService.setupListenerOnSelectedWinnerReply().subscribe((data) =>
        {
            logData("SelectWinnerReply");
            logData(data);

            this.gameFinished = data["game_finished"];
            if (!this.gameFinished) {

                this.roundWinner = new UserModel(data["round_winner"]);
                const winnerIndex = this.users.findIndex((user) => user.uuid === this.roundWinner.uuid);
                this.users[winnerIndex] = {...this.roundWinner};
                if (this.roundWinner.username === this.localStorage.getUsername()) {
                    this.iAmWinner = true;
                }
                this.showRoundWinner = true;

                this.cardToShow = new CardModel( {
                    "userId": null,
                    "card": data["card_to_show"]
                });
                this.chooser = new UserModel(data["chooser"]);
                this.iAmChooser = data["i_am_chooser"];
                if (!this.iAmChooser) {
                    this.cards = data["cards"].map(card => new CardModel(card));
                } else {
                    this.cards = [];
                }
                this.round = data["round"];
                this.allUsersChose = false;
                this.cardSelected = false;
                this.showSelectButton = true;
                setTimeout(() => {
                    this.showRoundWinner = false;
                    this.iAmWinner = false;
                }, 1500);
            } else {
                this.finishGame();
            }
        });

        this.websocketService.setupListenerOnFinishGameReply().subscribe((data) => {
            this.gameWinner = new UserModel(data["winner"]);
            this.showGameWinner = true;
        });
    }

    public finishGame() {
        this.websocketService.finishGame({
            "room_id" : this.roomId
        });
    }

    public onSelectCardClick(card: CardModel)
    {
        if (this.iAmChooser)
        {
            this.websocketService.chosenSelectedWinner({
                "room_id": this.roomId,
                "winner_card": card
            })
        } else
        {
            this.websocketService.chosenCard({
                "room_id": this.roomId,
                "chosen_card": card
            });
            this.cardSelected = true;
        }
    }
}
