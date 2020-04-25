import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import * as io from 'socket.io-client';
import {
    CHOSEN_CARD,
    CHOSEN_CARD_REPLY, CHOSEN_SELECTED_WINNER, CHOSEN_SELECTED_WINNER_REPLY,
    CREATE_ROOM,
    CREATE_ROOM_REPLY, FINISH_GAME, FINISH_GAME_REPLY,
    JOIN_ROOM,
    JOIN_ROOM_REPLY, KICK_USER, KICK_USER_REPLY,
    LEAVE_ROOM,
    LEAVE_ROOM_REPLY, START_GAME, START_GAME_REPLY, USER_DISCONECTED
} from '../utilities/properties/events.property';
import { Observable } from 'rxjs';
import {logData} from '../helpers/generic/generic.helper';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private url = environment.websocketUrl;
  private socket;

  public setupSocketConnection() {
      this.socket = io(this.url);
      logData(this.socket);
      this.socket.connect();
      this.socket.on('connect', () => {});
  }

  public disconnect() {
      this.socket = null;
  }

  public getSocket() {
      return this.socket;
  }

  public setupListenerOnCreateRoom(): Observable<any> {
      return new Observable(observer => {
          this.socket.on(CREATE_ROOM_REPLY, (data) => {
            observer.next(data);
          });
          return () => {
            this.socket.disconnect();
          }
      });
  }

  public setupListenerOnJoinRoomReply(): Observable<any> {
      return new Observable(observer => {
          this.socket.on(JOIN_ROOM_REPLY, (data) => {
              observer.next(data);
          });
          return () => {
              this.socket.disconnect();
          }
      });
  }

  public setupListenerOnLeaveRoomReply(): Observable<any> {
      return new Observable(observer => {
          this.socket.on(LEAVE_ROOM_REPLY, (data) => {
              observer.next(data);
          });
          return () => {
              this.socket.disconnect();
          }
      });
  }

  public setupListenerOnChosenCardReply(): Observable<any> {
      return new Observable(observer => {
          this.socket.on(CHOSEN_CARD_REPLY, (data) => {
              observer.next(data);
          });
          return () => {
              this.socket.disconnect();
          }
      });
  }

  public setupListenerOnSelectedWinnerReply(): Observable<any> {
      return new Observable(observer => {
          this.socket.on(CHOSEN_SELECTED_WINNER_REPLY, (data) => {
              observer.next(data);
          });
          return () => {
              this.socket.disconnect();
          }
      });
  }

  public setupListenerOnKickUserReply(): Observable<any> {
      return new Observable(observer => {
          this.socket.on(KICK_USER_REPLY, (data) => {
              observer.next(data);
          });
          return () => {
              this.socket.disconnect();
          }
      });
  }

  public setupListenerOnFinishGameReply(): Observable<any> {
      return new Observable(observer => {
          this.socket.on(FINISH_GAME_REPLY, (data) => {
              observer.next(data);
          });
          return () => {
              this.socket.disconnect();
          }
      });
  }

  public setupListenerOnUserDisconnected(): Observable<any> {
      return new Observable(observer => {
          this.socket.on(USER_DISCONECTED, (data) => {
              observer.next(data);
          });
          return () => {
              this.socket.disconnect();
          }
      });
  }

  public setupListenerOnStartGameReply(): Observable<any> {
      return new Observable(observer => {
          this.socket.on(START_GAME_REPLY, (data) => {
              observer.next(data);
          });
          return () => {
              this.socket.disconnect();
          }
      });
  }

  public chosenSelectedWinner(obj: any) {
      this.socket.emit(CHOSEN_SELECTED_WINNER, obj);
  }

  public finishGame(obj: any) {
      this.socket.emit(FINISH_GAME, obj);
  }

  public kickUser(obj: any) {
      this.socket.emit(KICK_USER, obj);
  }

  public chosenCard(obj: any) {
      this.socket.emit(CHOSEN_CARD, obj);
  }

  public createRoom(obj: any) {
      this.socket.emit(CREATE_ROOM, obj);
  }

  public leaveRoom(obj: any) {
      this.socket.emit(LEAVE_ROOM, obj);
  }

  public joinRoom(obj: any) {
      this.socket.emit(JOIN_ROOM, obj);
  }

  public startGame(obj: any) {
      this.socket.emit(START_GAME, obj);
  }

}
