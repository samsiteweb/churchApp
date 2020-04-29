import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import {
  AuthServiceService,
  storageNamesEnum,
  getStorageName,
} from "../auth-service.service";
import { TopLoaderService } from '../top-loader.service';
import { finalize } from 'rxjs/operators';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthServiceService, private loaderService: TopLoaderService) { }
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
      finalize(() => this.loaderService.hide()))
  }
}
