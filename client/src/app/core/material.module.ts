import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule, MatToolbarModule, MatMenuModule, MatIconModule,
  MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule, MatToolbarModule, MatMenuModule, MatIconModule,
    MatProgressSpinnerModule ],
  exports: [CommonModule, MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule, MatToolbarModule, MatMenuModule, MatIconModule,
    MatProgressSpinnerModule ],
})

export class CustomMaterialModule {}
