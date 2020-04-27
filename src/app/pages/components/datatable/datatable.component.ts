import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { MemberData } from "../../home/shared/models";
import { FormControl, Validators, Form, FormBuilder } from '@angular/forms';

@Component({
  selector: "app-datatable",
  templateUrl: "./datatable.component.html",
  styleUrls: ["./datatable.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class DatatableComponent implements OnInit {
  updateMemberForm
  toggleData = "true";
  @Input() tableType;
  @Input() scheduleActions
  @Input() dataSource
  @Input() columnsToDisplay
  @Output() roleToggle = new EventEmitter<any>();
  @Output() memberScheduleAction = new EventEmitter<any>();
  @Output() deleteAction = new EventEmitter<any>();
  @Output() notificationAction = new EventEmitter<any>()
  expandedElement: MemberData | null
  constructor(private fb: FormBuilder) {
    this.updateMemberForm = fb.group({
      AlternativeEmailAddress: ["", Validators.email],
      AlternativeMobileContact: [""]
    })
    setTimeout(() => {
      this.expandedElement = this.dataSource[0]
    }, 3000);

  }

  onSubmit(form) {
    console.log(form.value)
  }

  actionBtn(actions, schedule) {
    let eventActions = {
      ...actions,
      ScheduleId: schedule.ScheduleId
    }
    this.memberScheduleAction.emit(eventActions);
  }

  deleteSchedule(schedule) {
    console.log(schedule)
    this.deleteAction.emit(schedule)
  }

  ngOnInit(): void {

  }

  roleToggled() {
    this.roleToggle.emit();
  }

  togNotification(event) {
    this.notificationAction.emit(event)
    console.log(event)
  }

  togData(event, userId, roleId, source) {
    let data = {
      source: source,
      userId: userId,
      roleId: roleId,
      isActive: event.checked,
    };
    this.roleToggle.emit(data);
  }



}
