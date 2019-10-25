import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-dash-board',
  templateUrl: './chat-dash-board.component.html',
  styleUrls: ['./chat-dash-board.component.css']
})
export class ChatDashBoardComponent implements OnInit {
  currentRoomId: string;

  constructor() { }

  ngOnInit() {
  }

  setRoom(event) {
    this.currentRoomId = event;
  }
}
