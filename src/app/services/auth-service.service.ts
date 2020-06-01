import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { tap, map, mergeMap, mergeAll } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

export enum storageNamesEnum {
  currentUser,
}

interface storageNamesModel {
  key: storageNamesEnum;
  value: string;
}

export const getStorageName = (name: storageNamesEnum): string => {
  // var storageNames = Object.keys(storageNamesEnum).filter(key => !isNaN(Number(storageNamesEnum[key])));
  try {
    var storageName = Object.keys(storageNamesEnum).filter(
      (key) => !isNaN(Number(storageNamesEnum[key]))
    )[name];
    return storageName;
  } catch (error) {
    return "";
  }

  // return storageNames.find(n => n.key == name).value;
};
@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  loginParam = new BehaviorSubject<any>("");

  phone = this.loginParam.asObservable();
  phoneNumber: string;
  userToken;
  currentUser;

  apiUrl: string = "https://churchapp.igeeksng.com/prod_sup/api";
  constructor(private httpClient: HttpClient, private router: Router) {
    this.userToken = new BehaviorSubject(
      JSON.parse(
        localStorage.getItem(getStorageName(storageNamesEnum.currentUser))
      )
    );
    this.currentUser = this.userToken.asObservable();
  }

  setParams(params) {
    const options = { params: new HttpParams({ fromObject: params }) };
    return options;
  }
  setNumber(number) {
    this.loginParam.next(number);
  }

  authHigherUser(code) {
    return this.httpClient
      .get(
        `${this.apiUrl}/Authenticate/OAuthValidation`,
        this.setParams({ code: code })
      )
      .pipe(
        tap((data) => {

          this.resolveLogin(data);
        }),
        mergeMap((data: any) =>
          this.getUserInfo().pipe(
            tap((data) => {

            })
          )
        )
      );
  }

  authUser() {
    this.phone.subscribe((data) => {
      this.phoneNumber = data;
    });

    return this.httpClient
      .get(
        `${this.apiUrl}/Authenticate/OAuth`,
        this.setParams({ query: this.phoneNumber })
      )
      .pipe(
        tap((data) => {

          this.resolveLogin(data);
        }),
        mergeMap((data: any) =>
          this.getUserInfo().pipe(
            tap((data) => {

            })
          )
        )
      );
  }

  logInUser(phoneNumber) {

    return this.httpClient
      .get(
        `${this.apiUrl}/Authenticate/OAuth`,
        this.setParams({ query: phoneNumber })
      )
      .pipe(
        tap((data) => {

          this.resolveLogin(data);
        })
      );
  }

  logoutUser() {
    // remove local storage to log user out
    var storageNames = Object.keys(storageNamesEnum).filter(
      (key) => !isNaN(Number(storageNamesEnum[key]))
    );
    storageNames.forEach((storName) => {
      localStorage.removeItem(storName);
    });
    this.userToken.next(null);

    this.router.navigateByUrl("/");
  }

  getUserInfo() {
    return this.httpClient.get(`${this.apiUrl}/Transportation/RetrieveInfo`);
  }

  resolveLogin(user) {
    this.userToken.next(user);
    localStorage.setItem(
      getStorageName(storageNamesEnum.currentUser),
      JSON.stringify(user)
    );
  }
}
