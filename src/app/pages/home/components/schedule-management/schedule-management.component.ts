import { Component, OnInit } from '@angular/core';
import { MemberActionsService } from 'src/app/services/member-actions.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from "moment";
import { DialogComponent } from 'src/app/pages/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-schedule-management',
  templateUrl: './schedule-management.component.html',
  styleUrls: ['./schedule-management.component.scss']
})
export class ScheduleManagementComponent implements OnInit {
  tabLoadTimes: Date[] = [];
  allSchedule: any;
  scheduleActions: any
  columnsToDisplay = ["PickUpAddress", "ScheduleDate", "ScheduleTime", "PickUpMembers"];
  schedules: any;
  now = moment;
  constructor(private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private dialog: MatDialog,
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
      .subscribe((data) => {
        // this.sliceSchedule({ ScheduleId: event.ScheduleId })
        console.log(data)
      }, err => {
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
    this.memberAction.retriveScheduleTransportation().subscribe((data) => {
      this.schedules = data
    })
  }
  retriveMemberStatusList() {
    this.memberAction.retriveMemberStatusTransportation().subscribe((data: any) => {
      this.scheduleActions = data
    })
  }
  getAllSchedules() {
    this.memberAction.retriveScheduleHistoryTranspotation().subscribe((data) => {
      console.log(this.allSchedule, "Transportation")
      this.allSchedule = data
    })
  }

  ngOnInit() {
    this.getActiveSchedules()
  }
}
