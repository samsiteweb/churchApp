import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import * as moment from "moment";
@Component({
  selector: "app-schedule-cards",
  templateUrl: "./schedule-cards.component.html",
  styleUrls: ["./schedule-cards.component.scss"],
})
export class ScheduleCardsComponent implements OnInit {
  now = moment;
  @Input() schedule: any;
  @Input() scheduleActions: any;
  @Output() deleteClicked = new EventEmitter<any>();
  @Output() action = new EventEmitter<any>();
  constructor() {
  }

  ngOnInit(): void {
    // console.log(this.schedule, "schdedules")
  }

  actionBtn(actions, schedules) {
    let eventActions = {
      ...actions,
      ScheduleId: schedules.ScheduleId
    }
    this.action.emit(eventActions);
  }
  deleteSchedule() {
    this.deleteClicked.emit();
  }
}
