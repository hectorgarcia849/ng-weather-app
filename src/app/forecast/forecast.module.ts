import {NgModule} from "@angular/core";
import {ForecastComponent} from "./forecast.component";
import {CommonModule} from "@angular/common";
import {MatGridListModule} from "@angular/material";
import {MomentModule} from "angular2-moment";
import {AngularSvgIconModule} from "angular-svg-icon";

@NgModule({
  declarations: [ForecastComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    MomentModule,
    AngularSvgIconModule
  ],
  exports: [ForecastComponent],
})

export class ForecastModule {}
