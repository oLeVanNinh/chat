import { Component, TemplateRef } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { RoomService } from "./chat-room.service";
import { Room } from "../../model/room.model";

@Component({
  selector: 'sidebar-chat',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SideBarComponent {
  chatRooms: Room[];
  roomName: string = "";
  faPlus = faPlus;

  constructor(private dialog: MatDialog, private chatRoomService: RoomService) {
    this.chatRoomService.getRooms().subscribe(rooms => {
      this.chatRooms = rooms;
      console.log(this.chatRooms)
    })
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
    this.roomName = "";
    this.dialog.closeAll();
  }

  save(): void {
    this.chatRoomService.createRoom(this.roomName).subscribe((room) => {
      this.chatRooms.push(room);
      this.closeDialog();
    },
    (err) => {
      console.log(err);
    })
  }
}
