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
  @Input() type: any
  @Input() scheduleActions: any;
  @Output() assignClicked = new EventEmitter<any>()
  @Output() deleteClicked = new EventEmitter<any>();
  @Output() action = new EventEmitter<any>();
  constructor() {
    console.log(this.scheduleActions, "schedule actions")
  }

  ngOnInit(): void {

  }
  assign() {
    this.assignClicked.emit()
  }

  actionBtn(actions, schedules) {
    let eventActions = {
      ...actions,
      ScheduleId: schedules.ScheduleId
    }
    console.log(eventActions)
    this.action.emit(eventActions);
  }
  deleteSchedule() {
    this.deleteClicked.emit();
  }
}
