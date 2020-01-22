import { Component, Input, SimpleChange, OnInit, OnChanges, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { ChatService } from '@services/chat.service';
import { MessageService } from '@services/message.service';
import { Message } from '@models/message.model';
import { User } from '@models/user.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'main-chat',
  templateUrl: './mainchat.component.html',
  styleUrls: ['./mainchat.component.scss']
})

export class MainChatComponent implements OnInit, OnChanges {
  roomMessages: object = {};
  messages: Message[];
  currentMessage: string;
  userInRoomsHash: object = {};

  @Output() getUsersInRoom = new EventEmitter();
  @Input('currentRoomId') currentRoomId: string;
  @Input('currentUser') currentUser: User;
  @ViewChild('messagesElement', { read: ElementRef, static: true }) messagesElement: ElementRef;

  constructor(private chatService: MessageService, private socketService: ChatService) { }

  ngOnInit() {
    this.socketService.receiveMessage().subscribe(data => {
      this.messages.push(data.message);
      this.scrollToBottom();
    });
  }

  ngOnChanges(changes: {[property: string]: SimpleChange}): void {
    const roomChange = changes.currentRoomId;

    if (roomChange && !roomChange.firstChange && roomChange.currentValue !== roomChange.previousValue) {
      this.currentMessage = '';
      this.socketService.join(this.currentRoomId, this.currentUser._id);
      this.socketService.leave(roomChange.previousValue);
      this.chatService.getMessages(this.currentRoomId).pipe(take(1)).subscribe(data => {
        const users = data.users;
        this.messages = data.messages;
        this.getUsersInRoom.emit(users);
        this.buildUsersInRoomHash(users);
        this.scrollToBottom();
      });
    }
  }

  sendMessage(): void {
    if (!!this.currentMessage && !!this.currentRoomId) {
      this.chatService.createMessage(this.currentRoomId, this.currentMessage).subscribe((message) => {
        this.socketService.message(this.currentRoomId, message);
        this.messages.push(message);
        this.currentMessage = '';
        this.scrollToBottom();
      });
    }
  }

  scrollToBottom(): void {
    // Because view is not update instantly, so we need make it async
    window.setTimeout(() => {
      const messageHTMLElement = this.messagesElement.nativeElement;
      messageHTMLElement.scrollTop = messageHTMLElement.scrollHeight;
    }, 0);
  }

  buildUsersInRoomHash(objs) {
    objs.forEach(user => {
      const _id = user._id;
      this.userInRoomsHash[_id] = user;
    });
  }
}
