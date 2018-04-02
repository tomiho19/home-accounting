import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxChartsModule} from "@swimlane/ngx-charts";

@NgModule({
  imports: [ReactiveFormsModule, FormsModule, NgxChartsModule
  ],
  exports: [ReactiveFormsModule, FormsModule, NgxChartsModule],
  declarations: []
})
export class SharedModule{

}
