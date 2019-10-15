import { Component, TemplateRef } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'sidebar-chat',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SideBarComponent {
  faPlus = faPlus;
  channelName: String = ""

  constructor(private dialog: MatDialog) {}


  openDialog(template: TemplateRef<any>): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '500px';
    this.dialog.open(template, dialogConfig);
  }

  closeDialog(): void {
    this.channelName = "";
    this.dialog.closeAll();
  }

  save(): void {
    console.log('SHow');
  }
}
