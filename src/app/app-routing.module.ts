import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { HomeComponent } from "./pages/home/home.component";
import { OrgRegComponent } from "./pages/org-reg/org-reg.component";
import { OrganisationListResolver } from "./services/orgListResolver.service";
import { AuthGard } from "./services/authGuard.service";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "signup/:type",
    resolve: { orgList: OrganisationListResolver },
    component: SignupComponent,
  },

  {
    path: "org",
    component: OrgRegComponent,
  },
  {
    path: "home",
    canActivate: [AuthGard],
    loadChildren: () =>
      import("./pages/home/personal.module").then((m) => m.PersonalModule),
  },
  {
    path: "orders",
    loadChildren: () =>
      import("./orders/orders.module").then((m) => m.OrdersModule),
  },
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "/login",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
