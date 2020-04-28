import { Component, OnInit } from "@angular/core";
import { MemberActionsService } from "src/app/services/member-actions.service";
import { MemberData, TransMember } from "../../shared/models";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: "app-member-management",
  templateUrl: "./member-management.component.html",
  styleUrls: ["./member-management.component.scss"],
})
export class MemberManagementComponent implements OnInit {
  memberData: any
  transportMemberData: TransMember[]
  default = "all"
  Members = [
    {
      type: 'Member',
      group: [
        { value: 'all', viewValue: 'Retrive all Members' },
      ]
    },
    {
      type: 'Transportation',
      group: [
        { value: 'trans', viewValue: 'View Members' },
      ]
    },
  ]
  columnsToDisplay = ["Name", "Email", "PhoneNumber", "DateCreatedView"];
  constructor(
    private _snackBar: MatSnackBar,
    private memberAction: MemberActionsService
  ) {
    this.getAllMemberData();
  }

  changed(event) {
    switch (event.value) {
      case 'all':
        this.getAllMemberData()
        break;
      case 'trans':
        this.getAllTransportationMembers()
        break;

      default:
        break;
    }
  }

  getAllTransportationMembers() {
    this.memberAction.getAllTransportationMembers().subscribe((data: any) => {
      this.memberData = data;
      this.columnsToDisplay = ["Name", "Email", "PhoneNumber", "DateCreatedView", "IsMemberActive"];

    }, err => {

      this.openSnackBar(err.error.Message, 'ok')
      this.memberData = null
    });
  }

  notificationAction(body) {

    let action = {
      memberId: body.MemberId,
      allowMemberToRecieveNotification: body.AllowMemberToRecieveNotification,
      alternativeEmailAddress: body.AlternativeEmailAddress,
      alternativeMobileContact: body.AlternativeMobileContact
    }


    this.memberAction.updateMember(action).subscribe((data) => {

    }, (err) => {

    })
  }

  getAllMemberData() {
    this.memberAction
      .retriveMember()
      .subscribe((data: MemberData[]) => {
        this.memberData = data;

      }, err => {

        this.openSnackBar(err.error.Message, 'ok')
        this.memberData = null
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  toggleAction(event) {


    switch (event.source) {
      case "Roles":
        this.updateRoleStatus(event)
        break;
      case "Transport":
        if (event.isActive) {
          this.addToTransDept(event)
        } else {
          this.removeFromTransport(event)
        }

      default:
        break;
    }

  }
  removeFromTransport(event) {
    this.memberAction.deleteFromTransportationDept(event.userId).subscribe((data: any) => {
      this.openSnackBar(data.Message, 'ok')
    }, err => {
      this.openSnackBar(err.error.Message, 'ok')
    })
  }

  addToTransDept(event) {
    let body = {
      memberId: event.userId,
      allowMemberToRecieveNotification: true,
      alternativeEmailAddress: null,
      alternativeMobileContact: null
    }
    this.memberAction.addMemberToTransportationDpart(body).subscribe((data: any) => {
      this.openSnackBar(data.Message, 'ok')
    }, err => {
      this.openSnackBar(err.error.Message, 'ok')
    })
  }



  updateRoleStatus(event) {
    this.memberAction
      .updateRoleStatus(event.userId, event.roleId, event.isActive)
      .subscribe(
        (data: any) => {

          this.openSnackBar(data.Message, "ok");
        },
        (err) => {
          this.openSnackBar(err.error.Message, "ok");
          this.getAllMemberData();

        }
      );
  }

  ngOnInit(): void { }
}
