import { Component, OnInit } from "@angular/core";
import { MemberActionsService } from "src/app/services/member-actions.service";
import { MemberData } from "../../shared/models";
import { map } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-member-management",
  templateUrl: "./member-management.component.html",
  styleUrls: ["./member-management.component.scss"],
})
export class MemberManagementComponent implements OnInit {
  memberData: MemberData[];
  constructor(
    private _snackBar: MatSnackBar,
    private memberAction: MemberActionsService
  ) {
    this.getMemberData();
  }

  getMemberData() {
    this.memberAction
      .retriveMember()
      .pipe(
        map((resData: any) => {
          let newData = [];
          for (const dt of resData) {
            let dataIndex = newData.findIndex((dat) => dat.userId == dt.UserId);

            if (dataIndex > -1) {
              let role = {
                isRoleActive: dt.IsRoleActive,
                roleType: dt.RoleType,
                roleTitle: dt.RoleMeaning,
                roleId: dt.RoleId,
              };
              newData[dataIndex].roleInfo.push(role);
            } else {
              let trData = {
                userId: dt.UserId,
                Name: `${dt.FirstName} ${dt.LastName}`,
                Email: dt.Email,
                PhoneNumber: dt.PhoneNumber,
                roleInfo: [
                  {
                    isRoleActive: dt.IsRoleActive,
                    roleType: dt.RoleType,
                    roleTitle: dt.RoleMeaning,
                    roleId: dt.RoleId,
                  },
                ],
                DateCreatedView: dt.DateCreatedView,
                dateCreated: dt.DateCreated,
              };
              newData.push(trData);
            }
          }
          return newData;
        })
      )
      .subscribe((data: MemberData[]) => {
        this.memberData = data;
        console.log(this.memberData);
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  toggleAction(event) {
    console.log(event);

    this.memberAction
      .updateRoleStatus(event.userId, event.roleId, event.isActive)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.openSnackBar(data.Message, "ok");
        },
        (err) => {
          this.openSnackBar(err.error.Message, "ok");
          this.getMemberData();
          console.log(err.error.Message);
        }
      );
  }

  ngOnInit(): void {}
}
