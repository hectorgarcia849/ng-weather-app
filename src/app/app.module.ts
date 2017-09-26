import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import {MdAutocomplete, MdAutocompleteModule, MdGridListModule, MdInputModule, MdSelect} from "@angular/material";
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MdSelectModule} from '@angular/material';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { FiveDayTempComponent } from './five-day-temp/five-day-temp.component';
import {HostDirective} from "../host.directive";
import {DataVisualizationService} from "./services/data-visualization.service";
import { FiveDayWindComponent } from './five-day-wind/five-day-wind.component';
import { FiveDayHumidityComponent } from './five-day-humidity/five-day-humidity.component';
import { FiveDayPrecipitationComponent } from './five-day-precipitation/five-day-precipitation.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WeatherService} from "./services/weather.service";
import {Moment} from "moment";
import {MomentModule} from "angular2-moment";


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
    HttpClientModule,
    BrowserAnimationsModule,
    MdGridListModule,
    MdSelectModule,
    MdInputModule,
    MdAutocompleteModule,
    NgxChartsModule,
    ReactiveFormsModule,
    FormsModule,
    MomentModule
  ],
  providers: [DataVisualizationService, WeatherService],
  bootstrap: [AppComponent],
  entryComponents: [FiveDayTempComponent, FiveDayHumidityComponent, FiveDayPrecipitationComponent, FiveDayWindComponent]
})
export class AppModule { }
