import { NgModule } from '@angular/core';
import {FiveDayWindDirectionComponent} from "./five-day-wind-direction/five-day-wind-direction.component";
import {FiveDayHumidityComponent} from "./five-day-humidity/five-day-humidity.component";
import {FiveDayWindSpeedComponent} from "./five-day-wind-speed/five-day-wind-speed.component";
import {SixteenDayTempComponent} from "./sixteen-day-temp/sixteen-day-temp.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HostDirective} from "./host.directive";
import {
  MatButtonModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatSelectModule,
  MatSidenavModule
} from "@angular/material";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MomentModule} from "angular2-moment";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    FiveDayWindDirectionComponent,
    FiveDayHumidityComponent,
    FiveDayWindSpeedComponent,
    SixteenDayTempComponent,
    DashboardComponent,
    HostDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatSelectModule,
    MomentModule,
    NgxChartsModule,
    FlexLayoutModule
  ],
  exports: [
    DashboardComponent
  ],
  entryComponents: [FiveDayWindSpeedComponent, FiveDayHumidityComponent, FiveDayWindDirectionComponent, SixteenDayTempComponent]
})

export class WeatherChartsDashboardModule {}
