import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { ScheduleRideComponent } from "./components/schedule-ride/schedule-ride.component";
import { ScheduleHistoryComponent } from "./components/schedule-history/schedule-history.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { ScheduleResolver } from "src/app/services/interceptors/schedule.resolver";
import { MemberManagementComponent } from "./components/member-management/member-management.component";
import { ScheduleManagementComponent } from './components/schedule-management/schedule-management.component';
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
        path: "transport-management",
        component: ScheduleManagementComponent,
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
        component: ScheduleHistoryComponent,
      },
      {
        path: "",
        redirectTo: "/home/history",
        pathMatch: "full"
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(personalRoutes)],
  exports: [RouterModule],
})
export class PersonalRoutingModule { }
