import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  socketUrl = 'http://localhost:3000';
  socket: any;

  constructor() {
    this.socket = io(this.socketUrl);
  }

  connect(user) {
    this.socket.emit('connected', user);
  }

  join(roomId, userId) {
    this.socket.emit('join', { roomId, userId });
  }

  leave(roomId) {
    this.socket.emit('leave', roomId);
  }

  message(roomId, message) {
    this.socket.emit(('message'), { roomId, message });
  }

  receiveMessage(): Observable<any> {

    return new Observable(sub => {
      this.socket.on('chat message', (message) => {
        sub.next(message);
      });
    });
  }

  useJoinRoom(): Observable<any> {
    return new Observable(sub => {
      this.socket.on('join room', userId => {
        sub.next(userId);
      });
    });
  }

  userOffline(): Observable<any> {
    return new Observable(sub => {
      this.socket.on('offline', userId => {
        sub.next(userId);
      });
    });
  }
}
