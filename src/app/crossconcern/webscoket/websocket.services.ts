import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import * as io from 'socket.io-client';
import {CREATE_ROOM, CREATE_ROOM_REPLY} from '../utilities/properties/events.property';
import {logData} from '../helpers/generic/generic.helper';
import {Observable, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private url = environment.websocketUrl;
  private socket;

  public setupSocketConnection() {
    this.socket = io(this.url);
    this.socket.connect();
    this.socket.on('connect', () => {})
  }

  public setupListenerOnCreateRoom(): Subject<any>{

    let observable = new Observable(observer => {
      this.socket.on(CREATE_ROOM_REPLY, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });

    let observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      },
    };

    return Subject.create(observer, observable);
  }

  public createRoom(obj: any) {
    this.socket.emit(CREATE_ROOM, obj);
  }
}
