import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { tap, map, mergeMap, mergeAll } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SharedPersonalDataService {
  userInfoSubject;
  userInfo;
  apiUrl: string = "https://churchapp.igeeksng.com/prod_sup/api";
  constructor(private httpClient: HttpClient) {
    this.userInfoSubject = new BehaviorSubject("");
    this.userInfo = this.userInfoSubject.asObservable();
  }

  setUserInfo(userInfo) {
    this.userInfoSubject.next(userInfo);
  }
}
