import { Component, OnInit } from "@angular/core";
import { MediaMatcher } from "@angular/cdk/layout";
import { ChangeDetectorRef, OnDestroy } from "@angular/core";
import { AuthServiceService } from "src/app/services/auth-service.service";
import { ActivatedRoute } from "@angular/router";
import { switchMap, take } from "rxjs/operators";
import { SharedPersonalDataService } from "./shared/shared.personal.data.service";
import { Subscription } from "rxjs";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  userInfo: any;
  subscription: Subscription;
  subscription2: Subscription;
  mobileQuery: MediaQueryList;
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    { length: 50 },
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  );

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private authService: AuthServiceService,
    private route: ActivatedRoute,
    private dataService: SharedPersonalDataService
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    // this.authService.userToken.subscribe((data) => {
    //   console.log(data);
    // });

    // this.route.data.subscribe((data) => {
    //   console.log(data.userInfo, "user info");
    // });
  }

  showFiller = true;
  links = ["Schedule Ride", "Schedules History"];
  messages = [
    { content: "Ola", from: "from ", subject: "my subject" },
    { content: "destiny", from: "FROM", subject: "my subject" },
  ];

  ngOnInit(): void {
    this.subscription = this.authService.currentUser
      .pipe(
        switchMap((data: any) =>
          this.authService.getUserInfo(data.Token.Token)
        ),
        take(1)
      )
      .subscribe((data) => {
        this.userInfo = data;
        this.dataService.setUserInfo(data);
        console.log(data, "User Info Data");
      });
  }

  showInfo(info) {
    console.log(info);
  }

  logOutUser() {
    this.authService.logoutUser();
  }

  save() {}
  undo() {}
  openSidebar() {}
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subscription.unsubscribe();
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some((h) =>
    h.test(window.location.host)
  );
}
