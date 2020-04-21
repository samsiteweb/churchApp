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
  }

  editSchedule(schedule) {
    console.log("edit clicked");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
  deleteSchedule(sche) {
    console.log("delete clicked");
    this.memberAction.deleteSchedule(sche.ScheduleId).subscribe(
      (data: any) => {
        console.log(data);
        this.openSnackBar(data.Message, "ok");
        // this.schedules.slice()
        let scheduleIndex = this.schedules.findIndex(
          (schedule) => schedule.ScheduleId == sche.ScheduleId
        );
        console.log(scheduleIndex);
        if (scheduleIndex > -1) {
          this.schedules.splice(scheduleIndex, 1);
        }
      },
      (err) => {
        this.openSnackBar(err.error.Message, "ok");
      }
    );
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.schedules = data["schedules"];
      console.log(this.schedules);
    });
    // moment().format("DD MM YY");
  }
}
