import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { RegistrationService } from "./registration.service";

export interface OrgList {
  OrganizationId: string;
  OrganizationName: string;
  OrganizationAccountCode: string;
}

@Injectable()
export class OrganisationListResolver implements Resolve<OrgList> {
  constructor(private regService: RegistrationService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<OrgList> | Promise<OrgList> | OrgList {
    return this.regService.getAllRegOrg();
  }
}
