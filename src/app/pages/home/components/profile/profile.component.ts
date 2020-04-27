import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { SharedPersonalDataService } from "../../shared/shared.personal.data.service";
import { MemberActionsService } from 'src/app/services/member-actions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/pages/components/dialog/dialog.component';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  userInfo;
  code: string
  userForm: any;
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dataService: SharedPersonalDataService, private memberAction: MemberActionsService, private dialog: MatDialog
  ) {
    this.dataService.userInfo.subscribe((data) => {
      this.userInfo = data;
      console.log(this.userInfo);
    });

    const {
      State,
      City,
      StreetAddress,
      ZipCode,
      Country,
    } = this.userInfo.Address;

    this.userForm = this.fb.group({
      newAddress: this.fb.group({
        state: [State, [Validators.required]],
        city: [City, [Validators.required]],
        streetAddress: [StreetAddress, [Validators.required]],
        zipCode: [ZipCode, [Validators.required]],
        country: [Country, [Validators.required]],
      }),
      requestRideDateTime: "2020-04-14T18:23:15.904Z",
      extraNote: ["", [Validators.required]],
      ridersCount: [
        this.userInfo.RideRequestMemberCount,
        [Validators.required],
      ],
    });
  }

  onSubmit(form) {
    console.log(form);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  openDialog(message, type, actionType): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "300px",
      data: { type: type, code: this.code, actionType: actionType, message: message },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  requestDeleteAccount(type) {
    this.memberAction.requestDeleteAccount().subscribe((data: any) => {
      console.log(data)
      this.openSnackBar("Request Sent Successfully", "ok")
      this.openDialog(
        data.Message,
        "deleteRequest",
        type
      )
    })
  }

  ngOnInit(): void { }
}
