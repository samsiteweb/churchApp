import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PersonalRoutingModule } from "./personal-routing.module";
import { ScheduleHistoryComponent } from "./components/schedule-history/schedule-history.component";
import { ScheduleRideComponent } from "./components/schedule-ride/schedule-ride.component";
import { HomeComponent } from "./home.component";
import { SharedModule } from "src/app/shared.module";
import { CustomMaterialModule } from "src/app/sharedMaterialComponent.module";
import { AvatarModule } from "ngx-avatar";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AuthInterceptor } from "src/app/services/interceptors/auth.interceptors";
import { AuthUserResolver } from "src/app/services/interceptors/authUser.resolver";
import { ProfileComponent } from "./components/profile/profile.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { ScheduleResolver } from "src/app/services/interceptors/schedule.resolver";
import { MemberManagementComponent } from "./components/member-management/member-management.component";
import { ScheduleManagementComponent } from './components/schedule-management/schedule-management.component';
@NgModule({
  declarations: [
    HomeComponent,

    ScheduleRideComponent,
    ScheduleHistoryComponent,
    ProfileComponent,
    NotificationsComponent,
    MemberManagementComponent,
    ScheduleManagementComponent,
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    CustomMaterialModule,
    SharedModule,
    HttpClientModule,
    AvatarModule,
    ReactiveFormsModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [
    AuthUserResolver,
    ScheduleResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class PersonalModule {}
