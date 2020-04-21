import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthServiceService } from "./auth-service.service";
import { take, map } from "rxjs/operators";

@Injectable()
export class AuthGard implements CanActivate {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.currentUser.pipe(
      map((data) => {
        if (data) {
          return true;
        } else {
          this.router.navigateByUrl("/");
        }
      })
    );
  }
}
