import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthServiceService } from "src/app/services/auth-service.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router, ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../components/dialog/dialog.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  code;
  loginParam = new BehaviorSubject("");
  durationInSeconds = 5;
  contactregex: RegExp = /([1-9][0-9]*)|0/;
  authForm = this.fb.group({
    phoneNumber: [
      "",
      [Validators.required, Validators.pattern(this.contactregex)],
    ],
  });

  requestStart: boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  // openDialog(message, type): void {
  //   console.log(message, type, this.code)
  //   const dialogRef = this.dialog.open(DialogComponent, {
  //     width: "300px",
  //     data: { type: type, code: this.code, message: message },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {

  //   });
  // }

  ngOnInit(): void { }

  onSubmit(authForm) {
    this.requestStart = true;

    if (authForm.valid) {

      this.authService.logInUser(authForm.value.phoneNumber).subscribe(
        (data) => {

          this.openSnackBar("Authentication successful", "ok");
          this.requestStart = false;
          this.router.navigateByUrl("/home/ride");
        },
        (err) => {

          this.requestStart = false;

          // if (err.status == 511) {
          //   this.openSnackBar(err.error.Message, "ok");
          // this.openDialog(
          //   err.error.Message,
          //   "auth"
          // );
          // } else {
          //   this.router.navigate(["./signup/member"]);
          // }
        }
      );
    } else {
      this.requestStart = false;
    }
  }
  public phoneNumber = () => {
    return this.authForm.get("phoneNumber");
  };
  public hasErrors = (controlName: string, errorType: string) => {
    return this.authForm.controls[controlName].hasError(errorType);
  };
}
