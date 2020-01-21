import { Component, OnInit, Input } from '@angular/core';
import { User } from '@models/user.model';

@Component({
  selector: 'chat-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class ChatMembersComponent implements OnInit {

  @Input('userList') users: User[];

  constructor() { }

  ngOnInit() {
  }

}
