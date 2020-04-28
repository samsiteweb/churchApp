import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { OrgList } from "src/app/services/orgListResolver.service";
import { RegistrationService } from "src/app/services/registration.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  formSubmitted = false;
  formType: string;
  numRegex: RegExp = /([1-9][0-9]*)|0/;
  emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  orgList: OrgList[];
  regForm = this.fb.group({
    accountCode: ["", Validators.required],
    phoneNumber: ["", [Validators.required, Validators.pattern(this.numRegex)]],
    email: ["", [Validators.required, Validators.pattern(this.emailregex)]],
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    ridersCount: [
      null,
      [Validators.required, Validators.pattern(this.numRegex)],
    ],
    address: this.fb.group({
      riderCount: [0, [Validators.required, Validators.pattern(this.numRegex)]],
      state: ["", Validators.required],
      city: ["", Validators.required],
      streetAddress: ["", Validators.required],
      zipCode: ["", Validators.required],
      country: ["", Validators.required],
    }),
  });
  constructor(
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private regService: RegistrationService,
    private route: Router
  ) {
    this.router.data.subscribe((data) => {

      this.orgList = data["orgList"];
    });
  }

  ngOnInit(): void {
    this.formType = this.router.snapshot.paramMap.get("type");

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  onSubmit(regForm) {
    this.formSubmitted = true;

    if (regForm.valid) {

      this.regService.registerUser(regForm.value, this.formType).subscribe(
        (res) => {

          this.openSnackBar("Registration Successful", "ok");
          setTimeout(() => {
            this.route.navigateByUrl("login");
            this.formSubmitted = false;
          }, 3000);
        },
        (err) => {

          this.openSnackBar(err.error.Message, "ok");
          this.formSubmitted = false;
        }
      );
    } else {
      this.formSubmitted = false;
    }
  }

  getErrorMessage(controlName) {
    let control = this.regForm;
    return control.get(controlName).hasError("required")
      ? "*Field is required"
      : control.get(controlName).hasError("pattern")
        ? `*Not a valid ${controlName}`
        : control.get(controlName).hasError("alreadyInUse")
          ? `*This ${controlName} is already in use`
          : "";
  }
  getErrorAddressGroup(controlName) {
    let control = this.regForm;
    return control.get(["address", controlName]).hasError("required")
      ? "*Field is required"
      : control.get(["address", controlName]).hasError("pattern")
        ? `*Not a valid ${controlName}`
        : control.get(["address", controlName]).hasError("alreadyInUse")
          ? `*This ${controlName} is already in use`
          : "";
  }
}
