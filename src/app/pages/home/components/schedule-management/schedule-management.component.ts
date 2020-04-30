import { Component, OnInit } from '@angular/core';
import { MemberActionsService } from 'src/app/services/member-actions.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from "moment";
import { DialogComponent } from 'src/app/pages/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalserviceService } from 'src/app/services/modalservice.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-schedule-management',
  templateUrl: './schedule-management.component.html',
  styleUrls: ['./schedule-management.component.scss']
})
export class ScheduleManagementComponent implements OnInit {
  tabLoadTimes: Date[] = [];
  allSchedule: any;
  scheduleActions: any;
  columnsToDisplay = ["PickUpAddress", "ScheduleDate", "ScheduleTime", "PickUpMembers"];
  schedules: any;
  now = moment;
  constructor(private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private modalService: ModalserviceService,
    private memberAction: MemberActionsService) {

    this.getAllSchedules()
    this.retriveMemberStatusList()

  }

  opendia(schedule) {
    console.log(schedule, "schedue")
    this.openDialog("Assign Schedule", "transport", schedule.ScheduleId)
  }

  openDialog(message, type, actionType): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "300px",
      data: { type: type, actionType: actionType, message: message },
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  scheduleAction(event) {
    console.log(event, "Event")
    this.memberAction.updateMemberScheduleStatusTransportation(event.ScheduleStatusId, event.ScheduleId)
      .subscribe((data: any) => {
        // this.sliceSchedule({ ScheduleId: event.ScheduleId })
        this.modalService.toastModal('success', data.Message, "top-end")
        this.getAllSchedules()
        this.getActiveSchedules()
      }, err => {
        this.modalService.toastModal('error', err.error.Message, "top-end")
        console.log(err.error.Message)
      })
  }

  editSchedule(schedule) {

  }



  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }
    return this.tabLoadTimes[index];
  }


  sliceSchedule(schedule) {
    let scheduleIndex = this.schedules.findIndex(
      (schedule) => schedule.ScheduleId == schedule.ScheduleId
    );

    if (scheduleIndex > -1) {
      this.schedules.splice(scheduleIndex, 1);
    }
  }
  deleteSchedule(sche) {
    this.memberAction.deleteSchedule(sche.ScheduleId).subscribe(
      (data: any) => {
        this.sliceSchedule(sche)
        this.modalService.toastModal('success', 'Schedule deleted successfully', "top-end")
        // this.modalService.toastModal('success', "Deleted Successfully", 'top-end')
        this.getAllSchedules()
      },
      (err) => {
        this.modalService.toastModal('error', err.error.Message, "top-end")
      }
    );
  }

  getActiveSchedules() {
    this.memberAction.retriveScheduleTransportation().subscribe((data: any) => {
      this.schedules = data

    }, err => {
      this.modalService.toastModal('error', err.error.Message, "top-end")
    })
  }
  retriveMemberStatusList() {
    this.memberAction.retriveMemberStatusTransportation().subscribe((data: any) => {
      this.scheduleActions = data
    }, err => {
      this.modalService.toastModal('error', err.error.Message, "top-end")

    })
  }
  getAllSchedules() {
    this.memberAction.retriveScheduleHistoryTranspotation().subscribe((data) => {
      console.log(this.allSchedule, "Transportation")
      this.allSchedule = data
    }, err => {
      this.modalService.toastModal('error', err.error.Message, "top-end")
    })
  }

  ngOnInit() {
    this.getActiveSchedules()
  }
}
