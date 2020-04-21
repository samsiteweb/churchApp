import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthServiceService } from "src/app/services/auth-service.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router, ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../components/dialog/dialog.component";
// import { SnackBarComponent } from "src/app/components/snack-bar/snack-bar.component";

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
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  openDialog(message): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "300px",
      data: { code: this.code, message: message },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  // openSnackBar() {
  //   this._snackBar.openFromComponent(SnackBarComponent, {
  //     duration: this.durationInSeconds * 1000,
  //   });
  // }

  ngOnInit(): void {}

  onSubmit(authForm) {
    this.requestStart = true;
    console.log(authForm);
    if (authForm.valid) {
      console.log("form is valid");
      this.authService.logInUser(authForm.value.phoneNumber).subscribe(
        (data) => {
          console.log(data, "from login");
          this.openSnackBar("Authentication successful", "ok");
          this.requestStart = false;
          this.router.navigateByUrl("/home/ride");
        },
        (err) => {
          console.log(err);
          this.requestStart = false;

          if (err.status == 511) {
            this.openSnackBar(err.error.Message, "ok");
            this.openDialog(err.error.Message);
          } else {
            this.router.navigate(["./signup/member"]);
          }
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
