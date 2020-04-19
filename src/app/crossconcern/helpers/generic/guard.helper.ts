import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { WebsocketService } from '../../webscoket/websocket.services';

@Injectable()
export class GuardHelper implements CanActivate {

    constructor(private router: Router, private websocketService: WebsocketService) {}

    public canActivate() {
        const socket = this.websocketService.getSocket();
        if (socket != null && socket !== undefined) {
            return true;
        }
        this.router.navigate(["home"]);
        return false;
    }
}
