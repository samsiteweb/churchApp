import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomBtnComponent } from "./components/custom-btn/custom-btn.component";
import { CustomMaterialModule } from "./sharedMaterialComponent.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DialogComponent } from "./pages/components/dialog/dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ScheduleCardsComponent } from "./pages/components/schedule-cards/schedule-cards.component";
import { DatatableComponent } from "./pages/components/datatable/datatable.component";

@NgModule({
  declarations: [
    CustomBtnComponent,
    DialogComponent,
    ScheduleCardsComponent,
    DatatableComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CustomMaterialModule, FlexLayoutModule, FormsModule],
  exports: [
    CommonModule,
    CustomMaterialModule,
    CustomBtnComponent,
    FlexLayoutModule,
    DialogComponent,
    ScheduleCardsComponent,
    DatatableComponent,
  ],
})
export class SharedModule { }
