import { Component, Input, SimpleChange } from "@angular/core";
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

  constructor(private chatService: MessageService) { }

  ngOnInit() { }

  ngOnChanges(changes: {[property: string]: SimpleChange}): void {
    let change = changes['currentRoomId'];

    if (!change.firstChange && change.currentValue !== change.previousValue) {
      this.currentMessage = "";
      this.chatService.getMessages(this.currentRoomId).pipe(take(1)).subscribe(messages => {
        console.log(messages);
        this.messages = messages;
      });
    }
  }

  sendMessage(): void {
    if (!!this.currentMessage && !!this.currentRoomId) {
      this.chatService.createMessage(this.currentRoomId, this.currentMessage).subscribe((mess) => {
        console.log(mess);
        this.currentMessage = "";
      })
    }
  }
}
