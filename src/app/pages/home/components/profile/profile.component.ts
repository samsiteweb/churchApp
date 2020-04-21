import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { SharedPersonalDataService } from "../../shared/shared.personal.data.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  userInfo;
  userForm: any;
  constructor(
    private fb: FormBuilder,
    private dataService: SharedPersonalDataService
  ) {
    this.dataService.userInfo.subscribe((data) => {
      this.userInfo = data;
      console.log(this.userInfo);
    });

    const {
      State,
      City,
      StreetAddress,
      ZipCode,
      Country,
    } = this.userInfo.Address;

    this.userForm = this.fb.group({
      newAddress: this.fb.group({
        state: [State, [Validators.required]],
        city: [City, [Validators.required]],
        streetAddress: [StreetAddress, [Validators.required]],
        zipCode: [ZipCode, [Validators.required]],
        country: [Country, [Validators.required]],
      }),
      requestRideDateTime: "2020-04-14T18:23:15.904Z",
      extraNote: ["", [Validators.required]],
      ridersCount: [
        this.userInfo.RideRequestMemberCount,
        [Validators.required],
      ],
    });
  }

  onSubmit(form) {
    console.log(form);
  }

  ngOnInit(): void {}
}
