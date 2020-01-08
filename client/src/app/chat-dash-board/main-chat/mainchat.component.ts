import { Component, Input, SimpleChange, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../../share_service/chat.service';
import { MessageService } from '../../share_service/message.service';
import { Message } from '../../model/message.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'main-chat',
  templateUrl: './mainchat.component.html',
  styleUrls: ['./mainchat.component.css']
})

export class MainChatComponent implements OnInit, OnChanges {
  roomMessages: object = {};
  messages: Message[];
  currentMessage: string;

  @Input('currentRoomId') currentRoomId: string;
  @ViewChild('messagesElement', { read: ElementRef, static: true }) messagesElement: ElementRef;

  constructor(private chatService: MessageService, private socketService: ChatService) { }

  ngOnInit() {
    this.socketService.receiveMessage().subscribe(m => {
    });
  }

  ngOnChanges(changes: {[property: string]: SimpleChange}): void {
    const change = changes.currentRoomId;

    if (!change.firstChange && change.currentValue !== change.previousValue) {
      this.currentMessage = '';
      this.socketService.join(this.currentRoomId);
      this.socketService.leave(change.previousValue);
      this.chatService.getMessages(this.currentRoomId).pipe(take(1)).subscribe(messages => {
        this.messages = messages;

        // Because view is not update instantly, so we need make it async
        window.setTimeout(() => {
          this.scrollToBottom();
        }, 0);
      });
    }
  }

  sendMessage(): void {
    if (!!this.currentMessage && !!this.currentRoomId) {
      this.chatService.createMessage(this.currentRoomId, this.currentMessage).subscribe((message) => {
        this.socketService.message(this.currentRoomId, this.currentMessage);
        this.messages.push(message);
        this.currentMessage = '';

        // Because view is not update instantly, so we need make it async
        window.setTimeout(() => {
          this.scrollToBottom();
        }, 0);
      });
    }
  }

  scrollToBottom(): void {
    const messageHTMLElement = this.messagesElement.nativeElement;
    messageHTMLElement.scrollTop = messageHTMLElement.scrollHeight;
  }
}
