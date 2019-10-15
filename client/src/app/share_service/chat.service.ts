import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  constructor(private socket: Socket) {}

  connect() {
    this.socket.connect();
  }
}
