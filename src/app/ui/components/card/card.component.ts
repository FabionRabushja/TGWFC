import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CARD_SELECTOR } from '../../../crossconcern/utilities/properties/selector.property';
import { LocalStorageRepositoryInterface } from '../../../datastore/local/localstorage.interface';
import { WebsocketService } from '../../../crossconcern/webscoket/websocket.services';
import {CardModel} from '../../../datastore/models/card.model';

@Component({
    selector: CARD_SELECTOR,
    templateUrl: './card.component.html',
    styleUrls: ['./card.scss'],
})
export class CardComponent {
    public username: string;

    @Input() public card: CardModel;
    @Input() public yourCard: boolean;
    @Input() public cardSelected: boolean = false;
    @Input() public showSelectButton: boolean = true;

    public selected: boolean = false;

    @Output() public onSelectCard: EventEmitter<CardModel> = new EventEmitter();

    constructor(protected router: Router,
                protected websocketService: WebsocketService,
                protected localStorage: LocalStorageRepositoryInterface) {
        this.username = localStorage.getUsername();
    }

    public onSelectCardClick()
    {
        this.onSelectCard.emit(this.card);
        this.selected = true;
    }
}
