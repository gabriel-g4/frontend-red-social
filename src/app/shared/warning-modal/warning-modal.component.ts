import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-modal',
  imports: [],
  templateUrl: './warning-modal.component.html',
  styleUrl: './warning-modal.component.css'
})

export class WarningModalComponent {
  constructor(private dialogRef: MatDialogRef<WarningModalComponent>) {}

  confirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}