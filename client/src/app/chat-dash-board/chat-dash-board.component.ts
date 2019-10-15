import { Component, OnInit } from '@angular/core';
import { ChatService } from "../share_service/chat.service";

@Component({
  selector: 'app-chat-dash-board',
  templateUrl: './chat-dash-board.component.html',
  styleUrls: ['./chat-dash-board.component.css']
})
export class ChatDashBoardComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    console.log('Init');
    this.chatService.connect();
  }

}
