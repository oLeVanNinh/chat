import { Component, TemplateRef, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { RoomService } from './chat-room.service';
import { Room } from '../../models/room.model';

@Component({
  selector: 'sidebar-chat',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SideBarComponent {
  chatRooms: Room[];
  currentRoomId: string;
  roomName = '';
  faPlus = faPlus;

  @Output() selectRoom = new EventEmitter();

  constructor(private dialog: MatDialog, private chatRoomService: RoomService) {
    this.chatRoomService.getRooms().subscribe(rooms => {
      this.chatRooms = rooms;
    });
  }

  validRoomName(): boolean {
    return this.roomName.length > 6;
  }

  openDialog(template: TemplateRef<any>): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '500px';
    this.dialog.open(template, dialogConfig);
  }

  closeDialog(): void {
    this.roomName = '';
    this.dialog.closeAll();
  }

  save(): void {
    this.chatRoomService.createRoom(this.roomName).subscribe((room) => {
      this.chatRooms.push(room);
      this.closeDialog();
    },
    (err) => {
    });
  }

  setCurrentRoom(roomId: string): void {
    this.currentRoomId = roomId;
    this.selectRoom.emit(roomId);
  }
}
