import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-snack-bar",
  templateUrl: "./snack-bar.component.html",
  styles: [
    `
      .example-pizza-party {
        color: hotpink;
      }
    `,
  ],
})
export class SnackBarComponent implements OnInit {
  @Input() text: string = "snack bar ";
  constructor() {}

  ngOnInit(): void {}
}
