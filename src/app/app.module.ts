import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";

import { OrgRegComponent } from "./pages/org-reg/org-reg.component";
import { CustomMaterialModule } from "./sharedMaterialComponent.module";
import { SharedModule } from "./shared.module";
import { AvatarModule } from "ngx-avatar";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { OrganisationListResolver } from "./services/orgListResolver.service";
import { AuthGard } from "./services/authGuard.service";
import { AuthInterceptor } from "./services/interceptors/auth.interceptors";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    OrgRegComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CustomMaterialModule,
    SharedModule,
    AvatarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    OrganisationListResolver,
    AuthGard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
