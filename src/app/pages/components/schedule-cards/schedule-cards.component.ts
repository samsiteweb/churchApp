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
  @Output() deleteClicked = new EventEmitter<any>();
  @Output() editClicked = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  editSchedule() {
    this.editClicked.emit();
  }
  deleteSchedule() {
    this.deleteClicked.emit();
  }
}
