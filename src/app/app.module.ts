import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import {MdGridListModule, MdSelect} from "@angular/material";
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MdSelectModule} from '@angular/material';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { FiveDayTempComponent } from './five-day-temp/five-day-temp.component';
import {HostDirective} from "../host.directive";
import {DataVisualizationService} from "./services/data-visualization.service";
import { FiveDayWindComponent } from './five-day-wind/five-day-wind.component';
import { FiveDayHumidityComponent } from './five-day-humidity/five-day-humidity.component';
import { FiveDayPrecipitationComponent } from './five-day-precipitation/five-day-precipitation.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FiveDayTempComponent,
    HostDirective,
    FiveDayWindComponent,
    FiveDayHumidityComponent,
    FiveDayPrecipitationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdGridListModule,
    MdSelectModule,
    NgxChartsModule
  ],
  providers: [DataVisualizationService],
  bootstrap: [AppComponent],
  entryComponents: [FiveDayTempComponent, FiveDayHumidityComponent, FiveDayPrecipitationComponent, FiveDayWindComponent]
})
export class AppModule { }
