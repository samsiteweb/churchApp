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
import { ModalserviceService } from 'src/app/services/modalservice.service';

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnInit {
  verifyStart: boolean = false;
  constructor(
    private modalService: ModalserviceService,
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


  verifyCode() {
    this.verifyStart = true;
    this.authService.authHigherUser(this.data.code).subscribe(
      (data: any) => {
        this.verifyStart = false;
        this.onNoClick();
        this.router.navigateByUrl("/home/ride");
      },
      (err) => {
        this.modalService.toastModal('error', err.error.Message, "top-end")
        this.verifyStart = false;
      }
    );
  }

  accept() {
    this.verifyStart = true;
    console.log("accepted")
    console.log(this.data.comment, this.data.time)
    let body = {
      scheduleId: this.data.actionType,
      approximatedPickupTime_Min: this.data.time,
      driverMessage: this.data.comment
    }
    this.memberAction.assignScheduleTransportation(body).subscribe((data: any) => {
      this.verifyStart = false
      this.modalService.toastModal('success', data.Message, "top-end")
      this.onNoClick();
    }, err => {
      this.modalService.toastModal('error', err.error.Message, "top-end")
      this.verifyStart = false

    })
  }
  confirmDelete() {
    this.verifyStart = true;
    this.memberAction.deleteAccount(this.data.code, this.data.actionType).subscribe((data: any) => {
      this.authService.logoutUser()
      this.verifyStart = false;
      this.modalService.toastModal('success', data.Message, "top-end")
      this.onNoClick();
    }, err => {
      this.verifyStart = false;
      this.modalService.toastModal('error', err.error.Message, "top-end")
    })
  }
}
