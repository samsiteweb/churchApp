import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthServiceService } from "src/app/services/auth-service.service";
import { SharedPersonalDataService } from "../../shared/shared.personal.data.service";
import { MemberActionsService } from "src/app/services/member-actions.service";
import { ModalserviceService } from 'src/app/services/modalservice.service';


@Component({
  selector: "app-schedule-ride",
  templateUrl: "./schedule-ride.component.html",
  styleUrls: ["./schedule-ride.component.scss"],
})
export class ScheduleRideComponent implements OnInit {
  userInfo: any;
  rideForm: any;
  isSubmitted = false;
  dt;
  constructor(
    private fb: FormBuilder,
    private dataService: SharedPersonalDataService,
    private memberService: MemberActionsService,
    private modalService: ModalserviceService
  ) {
    this.dataService.userInfo.subscribe((data) => {
      this.userInfo = data;

    });

    const {
      State,
      City,
      StreetAddress,
      ZipCode,
      Country,
    } = this.userInfo.Address;

    this.rideForm = this.fb.group({
      newAddress: this.fb.group({
        state: [State, [Validators.required]],
        city: [City, [Validators.required]],
        streetAddress: [StreetAddress, [Validators.required]],
        zipCode: [ZipCode, [Validators.required]],
        country: [Country, [Validators.required]],
      }),
      requestRideDateTime: ["", [Validators.required]],
      extraNote: [""],
      ridersCount: [
        this.userInfo.RideRequestMemberCount,
        [Validators.required],
      ],
    });
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  get DateTime() {
    return this.rideForm.get("requestRideDateTime");
  }

  onSubmit(form) {
    this.isSubmitted = true;
    if (this.rideForm.valid) {

      this.memberService.scheduleRide(form.value).subscribe((res: any) => {
        console.log(res, "response")
        this.isSubmitted = false
        this.modalService.successModal(`For addition support, kindly reach out to us at contact@igeeksng.com.`, 'Schedule Created Successfully')
      }, err => {
        this.modalService.toastModal('error', err.error.Message, "top-end")

      });
    }
  }

  getErrorMessage(controlName) {
    let control = this.rideForm;
    return control.get(controlName).hasError("required")
      ? "*Field is required"
      : control.get(controlName).hasError("pattern")
        ? `*Not a valid ${controlName}`
        : control.get(controlName).hasError("alreadyInUse")
          ? `*This ${controlName} is already in use`
          : "";
  }
  getErrorMessage2(controlName) {
    let control = this.rideForm;
    return control.get(["newAddress", controlName]).hasError("required")
      ? "*Field is required"
      : control.get(["newAddress", controlName]).hasError("pattern")
        ? `*Not a valid ${controlName}`
        : control.get(["newAddress", controlName]).hasError("alreadyInUse")
          ? `*This ${controlName} is already in use`
          : "";
  }
  ngOnInit(): void { }
}
