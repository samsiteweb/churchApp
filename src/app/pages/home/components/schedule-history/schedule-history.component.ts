import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as moment from "moment";
import { MemberActionsService } from "src/app/services/member-actions.service";
import { MatSnackBar } from "@angular/material/snack-bar";

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
    private memberAction: MemberActionsService
  ) {


    this.getAllSchedules()
    this.retriveMemberStatusList()
  }
  scheduleAction(event) {

    switch (event.ScheduleStatus) {
      case 'Cancel':
        this.memberAction.updateMemberScheduleStatus(event.ScheduleStatusId, event.ScheduleId)
          .subscribe((data) => {
            this.sliceSchedule({ ScheduleId: event.ScheduleId })
          }, err => {
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
    })
  }

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }
    return this.tabLoadTimes[index];
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
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

        this.openSnackBar(data.Message, "ok");

        this.sliceSchedule(sche)
      },
      (err) => {
        this.openSnackBar(err.error.Message, "ok");
      }
    );
  }

  getActiveSchedules() {
    this.memberAction.getActiveSchedules().subscribe((data) => {
      this.schedules = data
    })
  }

  getAllSchedules() {
    this.memberAction.getAllMemberScheduleHistroy().subscribe((data) => {
      this.allSchedule = data
      this.columnsToDisplay = ["PickUpAddress", "ScheduleDate", "ScheduleTime", "PickUpMembers"]
    })
  }

  ngOnInit() {

    this.getActiveSchedules()

  }
}
