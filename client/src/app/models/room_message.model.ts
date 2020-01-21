import { Message } from '@models/message.model';
import { User } from '@models/user.model';

export interface RoomMessage {
  messages: Message[];
  users: User[];
}
