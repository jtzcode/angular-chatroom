import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { UserLogon } from '../types/userLogon';

@Injectable({
  providedIn: 'root'
})
export class ChatMessagesService {

  constructor(private socket: Socket) { }

  public SendMessage = (message: string) => {
    this.socket.emit('message', message);
  }

  private JoinRoom = (room: string) => {
    this.socket.emit('joinRoom', room);
  }

  public GetMessages = (room: string) => {
    this.JoinRoom(room);
    return Observable.create((ob) => {
      this.socket.fromEvent<UserLogon>('userLogon').subscribe((user: UserLogon) => {
        ob.next(`${user.user} logged on at ${user.time}`);
      });
      this.socket.on('message', (msg: string) => {
        ob.next(msg);
      });
      this.socket.on('allMessages', (msg: string[]) => {
        msg.forEach((text: any) => {
          ob.next(text.messageText);
        });
      });
    });
  }
}
