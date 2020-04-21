import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthServiceService } from "../auth-service.service";
import { switchMap, take } from "rxjs/operators";

export interface OrgList {
  OrganizationId: string;
  OrganizationName: string;
  OrganizationAccountCode: string;
}

@Injectable()
export class AuthUserResolver implements Resolve<any> {
  constructor(private authService: AuthServiceService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.authService.authUser();
  }
}
