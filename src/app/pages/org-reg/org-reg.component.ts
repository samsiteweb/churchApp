import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { RegistrationService } from "src/app/services/registration.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: "app-org-reg",
  templateUrl: "./org-reg.component.html",
  styleUrls: ["./org-reg.component.scss"],
})
export class OrgRegComponent implements OnInit {
  formSubmitted: boolean = false;
  emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  contactregex: RegExp = /([1-9][0-9]*)|0/;
  orgForm = this.fb.group({
    name: ["", Validators.required],
    email: ["", [Validators.pattern(this.emailregex), Validators.required]],
    contact: ["", [Validators.pattern(this.contactregex), Validators.required]],
    address: ["", Validators.required],
    country: ["", Validators.required],
    accountCode: ["", Validators.required],
  });
  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private regService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(orgForm) {
    this.formSubmitted = true;
    console.log(orgForm);
    if (orgForm.valid) {
      console.log(orgForm.value);
      this.regService.registerOrg(orgForm.value).subscribe(
        (res) => {
          console.log(res);
          this.openSnackBar(res["Message"], "Ok");

          setTimeout(() => {
            this.router.navigateByUrl("login");
            this.formSubmitted = false;
          }, 3000);
        },
        (err) => {
          this.openSnackBar(err.error.Message, "Ok");
          this.formSubmitted = false;
        }
      );
    } else {
      this.formSubmitted = false;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  getErrorMessage(controlName) {
    let control = this.orgForm;
    return control.get(controlName).hasError("required")
      ? "*Field is required"
      : control.get(controlName).hasError("pattern")
      ? `*Not a valid ${controlName}`
      : control.get(controlName).hasError("alreadyInUse")
      ? `*This ${controlName} is already in use`
      : "";
  }
}
