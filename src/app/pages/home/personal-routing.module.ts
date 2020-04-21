import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { ScheduleRideComponent } from "./components/schedule-ride/schedule-ride.component";
import { ScheduleHistoryComponent } from "./components/schedule-history/schedule-history.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { ScheduleResolver } from "src/app/services/interceptors/schedule.resolver";
import { MemberManagementComponent } from "./components/member-management/member-management.component";
// import { ScheduleRideComponent } from "./components/schedule-ride/schedule-ride.component";

const personalRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,

    children: [
      {
        path: "ride",
        component: ScheduleRideComponent,
      },
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "note",
        component: NotificationsComponent,
      },
      {
        path: "member",
        component: MemberManagementComponent,
      },
      {
        path: "history",
        resolve: { schedules: ScheduleResolver },
        component: ScheduleHistoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(personalRoutes)],
  exports: [RouterModule],
})
export class PersonalRoutingModule {}
