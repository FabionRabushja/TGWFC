import { Injectable } from '@angular/core';
import { Subject , Observable, Observer} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private subject: Subject<MessageEvent>;

  public connect(url): Subject<MessageEvent> {

    if (!this.subject) {

      this.subject = this.create(url);
      console.log('Successfully connected: ' + url);

    }

    return this.subject;
  }

  private create(url): Subject<MessageEvent> {

    const ws = new WebSocket(url);

    const observable = new Observable((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });

    const observer = {
      next: (data: object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };

    return Subject.create(observer, observable);
  }
}
