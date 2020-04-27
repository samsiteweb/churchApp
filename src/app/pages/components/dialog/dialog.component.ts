import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { LoginComponent } from "../../login/login.component";
import { AuthServiceService } from "src/app/services/auth-service.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { MemberActionsService } from 'src/app/services/member-actions.service';

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
  verifyStart: boolean = false;
  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthServiceService,
    private router: Router,
    private memberAction: MemberActionsService
  ) { }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  verifyCode() {
    this.verifyStart = true;
    this.authService.authHigherUser(this.data.code).subscribe(
      (data) => {
        console.log(data, "from login");
        this.openSnackBar("Authentication successful", "ok");
        this.verifyStart = false;
        this.onNoClick();
        this.router.navigateByUrl("/home/ride");
      },
      (err) => {
        console.log(err);
        this.verifyStart = false;
        this.openSnackBar(err.error.Message, "ok");
      }
    );
  }
  confirmDelete() {
    console.log('request delete')
    this.memberAction.deleteAccount(this.data.code, this.data.actionType).subscribe((data) => {
      console.log(data)
      this.openSnackBar("Delete was successfull", 'ok')
      this.authService.logoutUser()
    }, err => {
      this.openSnackBar(err.error.Message, 'ok')
    })
  }
}
