import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import * as io from "socket.io-client"

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  socketUrl = 'http://localhost:3000';
  socket: any;

  constructor() {
    this.socket = io(this.socketUrl);
  }

  connect() {
    this.socket.on('connect', function() {
      console.log('Connect');
    })
  }

  join(roomId) {
    this.socket.emit('join', roomId);
  }

  leave(roomId) {
    this.socket.emit('leave', roomId);
  }

  message(roomId, message) {
    this.socket.emit(('message'), { roomId: roomId, message: message });
  }

  receiveMessage(): Observable<any> {

    return new Observable(sub => {
      this.socket.on('chat message', function(message) {
        sub.next(message);
      })
    })
  }
}
