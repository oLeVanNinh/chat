import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SessionService } from '@services/session.service';

@Component({
  selector: 'app-chat-dash-board',
  templateUrl: './chat-dash-board.component.html',
  styleUrls: ['./chat-dash-board.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatDashBoardComponent implements OnInit {
  currentRoomId: string;

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
  }

  setRoom(event) {
    this.currentRoomId = event;
  }

  onLogOutClick() {
    this.sessionService.logout();
  }
}
