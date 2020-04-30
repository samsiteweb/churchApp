import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../pages/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }


  openDialog(message, type): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "300px",
      data: { type: type, message: message },
    });

    dialogRef.afterClosed().subscribe((result) => {

    });
  }
}
