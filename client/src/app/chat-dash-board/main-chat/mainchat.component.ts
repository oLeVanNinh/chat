import { Component, Input, SimpleChange, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../../share_service/chat.service';
import { MessageService } from '../../share_service/message.service';
import { Message } from '../../models/message.model';
import { take } from 'rxjs/operators';
import { User } from '@models/user.model';

@Component({
  selector: 'main-chat',
  templateUrl: './mainchat.component.html',
  styleUrls: ['./mainchat.component.scss']
})

export class MainChatComponent implements OnInit, OnChanges {
  roomMessages: object = {};
  messages: Message[];
  currentMessage: string;

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
      this.socketService.join(this.currentRoomId);
      this.socketService.leave(roomChange.previousValue);
      this.chatService.getMessages(this.currentRoomId).pipe(take(1)).subscribe(data => {
        this.messages = data.messages;
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
}
