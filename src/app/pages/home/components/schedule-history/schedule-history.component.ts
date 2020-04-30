import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { MemberActionsService } from "src/app/services/member-actions.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ModalserviceService } from 'src/app/services/modalservice.service';

@Component({
  selector: "app-schedule-history",
  templateUrl: "./schedule-history.component.html",
  styleUrls: ["./schedule-history.component.scss"],
})
export class ScheduleHistoryComponent implements OnInit {
  tabLoadTimes: Date[] = [];
  allSchedule: any;
  scheduleActions: any
  columnsToDisplay = ["Name", "Email", "PhoneNumber", "DateCreatedView"];
  schedules: any;
  now = moment;
  constructor(
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private modalService: ModalserviceService,
    private memberAction: MemberActionsService
  ) {


    this.getAllSchedules()
    this.retriveMemberStatusList()
  }
  scheduleAction(event) {
    switch (event.ScheduleStatus) {
      case 'Cancel':
        this.memberAction.updateMemberScheduleStatus(event.ScheduleStatusId, event.ScheduleId)
          .subscribe((data: any) => {
            this.sliceSchedule({ ScheduleId: event.ScheduleId })

            this.modalService.toastModal('success', data.Message, "top-end")
            this.getAllSchedules()
          }, err => {
            this.modalService.toastModal('error', err.error.Message, "top-end")
          })
        break;
      default:
        break;
    }
  }

  editSchedule(schedule) {

  }

  retriveMemberStatusList() {
    this.memberAction.retriveMemberStatusList().subscribe((data: any) => {
      this.scheduleActions = data

    }, err => {
      this.modalService.toastModal('success', err.error.Message, "top-end")
    })
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
        this.getAllSchedules()
      },
      (err) => {
        this.modalService.toastModal('error', err.error.Message, "top-end")
      }
    );
  }

  getActiveSchedules() {
    this.memberAction.getActiveSchedules().subscribe((data) => {
      this.schedules = data
    }, err => {
      this.modalService.toastModal('error', err.error.Message, "top-end")
    })
  }

  getAllSchedules() {
    this.memberAction.getAllMemberScheduleHistroy().subscribe((data) => {
      this.allSchedule = data
      this.columnsToDisplay = ["PickUpAddress", "ScheduleDate", "ScheduleTime", "PickUpMembers"]
    }, err => {
      this.modalService.toastModal('error', err.error.Message, "top-end")
    })
  }

  ngOnInit() {

    this.getActiveSchedules()

  }
}
