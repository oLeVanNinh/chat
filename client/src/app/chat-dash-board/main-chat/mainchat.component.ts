import { Component, Input, SimpleChange } from "@angular/core";
import { ChatService } from "../../share_service/chat.service";
import { MessageService } from "../../share_service/message.service";
import { Message } from "../../model/message.model";
import { take } from 'rxjs/operators';

@Component({
  selector: 'main-chat',
  templateUrl: './mainchat.component.html',
  styleUrls: ['./mainchat.component.css']
})

export class MainChatComponent {
  roomMessages: Object = {};
  messages: Message[];
  currentMessage: string;

  @Input('currentRoomId') currentRoomId: string;

  constructor(private chatService: MessageService, private socketService: ChatService) { }

  ngOnInit() {
    this.socketService.receiveMessage().subscribe(m => console.log(m));
  }

  ngOnChanges(changes: {[property: string]: SimpleChange}): void {
    let change = changes['currentRoomId'];

    if (!change.firstChange && change.currentValue !== change.previousValue) {
      this.currentMessage = "";
      this.socketService.join(this.currentRoomId);
      this.socketService.leave(change.previousValue);
      this.chatService.getMessages(this.currentRoomId).pipe(take(1)).subscribe(messages => {
        this.messages = messages;
      });
    }
  }

  sendMessage(): void {
    if (!!this.currentMessage && !!this.currentRoomId) {
      this.chatService.createMessage(this.currentRoomId, this.currentMessage).subscribe((mess) => {
        this.socketService.message(this.currentRoomId, this.currentMessage);
        this.currentMessage = "";
      })
    }
  }
}
