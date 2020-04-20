import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import * as io from 'socket.io-client';
import {
    CREATE_ROOM,
    CREATE_ROOM_REPLY,
    JOIN_ROOM,
    JOIN_ROOM_REPLY,
    LEAVE_ROOM,
    LEAVE_ROOM_REPLY, USER_DISCONECTED
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

  public createRoom(obj: any) {
      this.socket.emit(CREATE_ROOM, obj);
  }

  public leaveRoom(obj: any) {
      this.socket.emit(LEAVE_ROOM, obj);
  }

  public joinRoom(obj: any) {
      this.socket.emit(JOIN_ROOM, obj);
  }
}
