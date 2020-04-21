import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { MemberData } from "../../home/shared/models";

@Component({
  selector: "app-datatable",
  templateUrl: "./datatable.component.html",
  styleUrls: ["./datatable.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class DatatableComponent implements OnInit {
  toggleData = "true";
  @Input() dataSource;
  @Output() roleToggle = new EventEmitter<any>();
  columnsToDisplay = ["Name", "Email", "PhoneNumber", "DateCreatedView"];
  expandedElement: MemberData | null;
  constructor() {}

  roleToggled() {
    console.log(this.toggleData);
    this.roleToggle.emit();
  }

  togData(event, userId, roleId) {
    let data = {
      userId: userId,
      roleId: roleId,
      isActive: event.checked,
    };
    this.roleToggle.emit(data);
  }

  ngOnInit(): void {
    console.log(this.dataSource, "datasource");
  }
}
