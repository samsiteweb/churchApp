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
    // add this 2 of 4
    console.log("hello world", this.now().format("dd yy mm")); // add this 3 of 4
    console.log(this.now().add(7, "days").format()); // add this 4of 4
    this.getAllSchedules()
    this.retriveMemberStatusList()
  }
  scheduleAction(event) {
    console.log(event.ScheduleStatus, 'event')
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
    console.log("edit clicked");
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
    console.log(scheduleIndex);
    if (scheduleIndex > -1) {
      this.schedules.splice(scheduleIndex, 1);
    }
  }
  deleteSchedule(sche) {
    console.log("delete clicked");
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
