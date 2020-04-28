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
  notificationText
  updated = false
  editEmail = false;
  editPhone = false;
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

  get email() {
    return this.updateMemberForm.get('AlternativeEmailAddress')
  }
  get phone() {
    return this.updateMemberForm.get('AlternativeMobileContact')
  }

  editClicked(source, value) {

    source == 'email' ? this.email.value = "" : this.phone.value = ""
    source == 'email' ? this.editEmail = true : this.editPhone = true
    this.updated = true
  }
  onSubmit(form, element) {
    let additionalData = {
      ...element,
      AlternativeEmailAddress: this.email.value !== "" ? this.email.value : element.AlternativeEmailAddress,
      AlternativeMobileContact: this.phone.value !== "" ? this.phone.value : element.AlternativeMobileContact
    }
    this.notificationAction.emit(additionalData)
    this.updated = false
  }

  clicked(e) {

  }

  actionBtn(actions, schedule) {
    let eventActions = {
      ...actions,
      ScheduleId: schedule.ScheduleId
    }
    this.memberScheduleAction.emit(eventActions);
  }

  deleteSchedule(schedule) {

    this.deleteAction.emit(schedule)
  }

  ngOnInit(): void {

  }

  roleToggled() {
    this.roleToggle.emit();
  }

  togNotification(event) {

    let latest = {
      ...event,
      AllowMemberToRecieveNotification: !event.AllowMemberToRecieveNotification
    }

    this.notificationAction.emit(latest)

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
