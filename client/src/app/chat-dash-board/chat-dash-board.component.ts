import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { SessionService } from '@services/session.service';
import { User } from '../models/user.model';
import { ChatService } from '@services/chat.service';

@Component({
  selector: 'app-chat-dash-board',
  templateUrl: './chat-dash-board.component.html',
  styleUrls: ['./chat-dash-board.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChatDashBoardComponent implements OnInit, OnDestroy {
  currentRoomId: string;
  user: User;
  users: User[];

  constructor(private sessionService: SessionService, private socketService: ChatService) { }

  ngOnInit() {
    this.sessionService.getUserInfo().subscribe(user => {
      this.user = user;
      this.socketService.connect(user);
    });
  }

  ngOnDestroy(): void {
  }

  setRoom(roomId) {
    this.currentRoomId = roomId;
  }

  setUserForRoom(users) {
    this.users = users;
  }

  onLogOutClick() {
    this.sessionService.logout();
  }
}
