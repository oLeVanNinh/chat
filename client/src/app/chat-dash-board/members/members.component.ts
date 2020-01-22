import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '@services/chat.service';
import { User } from '@models/user.model';

@Component({
  selector: 'chat-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class ChatMembersComponent implements OnInit {

  @Input('userList') users: User[];

  constructor(private soketService: ChatService) { }

  ngOnInit() {
    this.soketService.useJoinRoom().subscribe(userId => {
      const user = this.users.find(u => u._id === userId);
      user.status = true;
    });

    this.soketService.userOffline().subscribe(userId => {
      const user = this.users.find(u => u._id === userId);
      user.status = false;
    });
  }
}
