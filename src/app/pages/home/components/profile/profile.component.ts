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
  altForm
  userForm: any;
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private dataService: SharedPersonalDataService, private memberAction: MemberActionsService, private dialog: MatDialog
  ) {
    this.dataService.userInfo.subscribe((data) => {
      this.userInfo = data;
      console.log(this.userInfo)
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
        state: [{ value: State, disabled: true }, [Validators.required]],
        city: [{ value: City, disabled: true }, [Validators.required]],
        streetAddress: [{ value: StreetAddress, disabled: true }, [Validators.required]],
        zipCode: [{ value: ZipCode, disabled: true }, [Validators.required]],
        country: [{ value: Country, disabled: true }, [Validators.required]],
      }),
      requestRideDateTime: "2020-04-14T18:23:15.904Z",
      extraNote: ["", [Validators.required]],
      ridersCount: [
        { value: this.userInfo.RideRequestMemberCount, disabled: true }
        ,
        [Validators.required],
      ],
    });

    this.altForm = this.fb.group(
      {
        memberId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        allowMemberToRecieveNotification: true,
        alternativeEmailAddress: "string",
        alternativeMobileContact: "string"
      }
    )
  }

  onSubmit(form) {

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

    });
  }

  requestDeleteAccount(type) {
    this.memberAction.requestDeleteAccount().subscribe((data: any) => {
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
