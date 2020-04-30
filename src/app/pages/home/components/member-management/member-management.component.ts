import { Component, OnInit } from "@angular/core";
import { MemberActionsService } from "src/app/services/member-actions.service";
import { MemberData, TransMember } from "../../shared/models";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ModalserviceService } from 'src/app/services/modalservice.service';


@Component({
  selector: "app-member-management",
  templateUrl: "./member-management.component.html",
  styleUrls: ["./member-management.component.scss"],
})
export class MemberManagementComponent implements OnInit {
  memberData: any;
  transportMemberData: TransMember[];
  default = "all";
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
  ];
  columnsToDisplay = ["Name", "Email", "PhoneNumber", "DateCreatedView"];
  constructor(

    private memberAction: MemberActionsService,
    private modalService: ModalserviceService
  ) {
    this.getAllMemberData();
  }

  changed(event) {
    switch (event.value) {
      case 'all':
        this.getAllMemberData();
        break;
      case 'trans':
        this.getAllTransportationMembers();
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
      this.modalService.toastModal('error', err.error.Message, 'top-end');
      this.memberData = null;
    });
  }

  notificationAction(body) {

    let action = {
      memberId: body.MemberId,
      allowMemberToRecieveNotification: body.AllowMemberToRecieveNotification,
      alternativeEmailAddress: body.AlternativeEmailAddress,
      alternativeMobileContact: body.AlternativeMobileContact
    };


    this.memberAction.updateMember(action).subscribe((data: any) => {
      this.modalService.toastModal('success', data.Message, 'bottom');
    }, (err) => {
      this.modalService.toastModal('error', err.error.Message, 'top-end');
    });
  }

  getAllMemberData() {
    this.memberAction
      .retriveMember()
      .subscribe((data: MemberData[]) => {
        this.memberData = data;

      }, err => {

        this.modalService.toastModal('error', err.error.Message, 'top-end');
        this.memberData = null;
      });
  }


  toggleAction(event) {

    switch (event.source) {
      case "Roles":
        this.updateRoleStatus(event);
        break;
      case "Transport":
        if (event.isActive) {
          this.addToTransDept(event);
        } else {
          this.removeFromTransport(event);
        }

      default:
        break;
    }

  }
  removeFromTransport(event) {
    this.memberAction.deleteFromTransportationDept(event.userId).subscribe((data: any) => {
      this.modalService.toastModal('success', data.Message, 'top-end');
      this.getAllTransportationMembers()
    }, err => {
      this.modalService.toastModal('error', err.error.Message, 'top-end');
    });
  }

  addToTransDept(event) {
    let body = {
      memberId: event.userId,
      allowMemberToRecieveNotification: true,
      alternativeEmailAddress: null,
      alternativeMobileContact: null
    };
    this.memberAction.addMemberToTransportationDpart(body).subscribe((data: any) => {
      this.modalService.toastModal('success', data.Message, 'bottom');
    }, err => {
      this.modalService.toastModal('error', err.error.Message, 'top-end');
    });
  }



  updateRoleStatus(event) {
    this.memberAction
      .updateRoleStatus(event.userId, event.roleId, event.isActive)
      .subscribe(
        (data: any) => {

          this.modalService.toastModal('success', data.Message, 'bottom');
        },
        (err) => {
          this.modalService.toastModal('error', err.error.Message, 'top-end');
          this.getAllMemberData();

        }
      );
  }

  ngOnInit(): void { }
}
