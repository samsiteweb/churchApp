import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Location } from '@angular/common';
import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import {
  AuthServiceService,
  storageNamesEnum,
  getStorageName,
} from "../auth-service.service";
import { TopLoaderService } from '../top-loader.service';
import { finalize, catchError } from 'rxjs/operators';
import { DialogService } from '../dialog.service';
import { Router, NavigationEnd } from '@angular/router';
import { ModalserviceService } from '../modalservice.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private location: Location, private router: Router, private modalService: ModalserviceService, private authService: AuthServiceService, private dialog: DialogService, private loaderService: TopLoaderService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loaderService.show()
    let userObj = JSON.parse(
      localStorage.getItem(getStorageName(storageNamesEnum.currentUser))
    );

    let clone;
    if (userObj) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${userObj.Token.Token}` },
      });
    } else {
    }

    request = request.clone({
      // setHeaders: {
      //   channel: `web`
      // }
    });

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse | any) => {
        // console.log(error, "the error")
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          if (error.status === 511) {
            this.dialog.openDialog(error.error.Message, 'auth')
          } else if (error.status === 401) {
            if (this.router.url.includes("/login")) {
              this.router.navigateByUrl("/signup/member")
            } else {
              this.router.navigate(["./login"])
            }
          } else if (error.status == 403) {
            console.log(error.url, "url error")
            console.log(location, "this location")
            if (error.url.includes('/Registration/RetrieveAllMembers')) {
              this.modalService.customModal("Sorry, You do have permission to view this page. Please contact info@igeeksng.com", "error", "Access Denied")
              this.location.back();
            } else if (location.pathname == "/home/transport-management" && error.url.includes('/Transportation/RetrieveScheduleTransportation')) {
              this.modalService.customModal("Sorry, You do have permission to view this page. Please contact info@igeeksng.com", "error", "Access Denied")
              this.location.back();
            }
            else {
              this.modalService.toastModal('error', error.error.Message, "top-end")
            }


          } else {
            this.authService.logoutUser()
          }

        }
        return throwError(errorMessage);
      }),
      finalize(() => this.loaderService.hide()),
    )
  }
}
