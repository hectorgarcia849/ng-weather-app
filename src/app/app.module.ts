import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './map/search/search.component';
import {
  MatAutocompleteModule, MatButtonModule, MatGridListModule, MatInputModule, MatSidenavModule, MatIconModule, MatMenuModule,
  MatSnackBarModule, MatSelectModule
} from "@angular/material";
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { SixteenDayTempComponent } from './weather-charts/sixteen-day-temp/sixteen-day-temp.component';
import {HostDirective} from "../host.directive";
import {DataVisualizationService} from "./services/data-visualization.service";
import { FiveDayWindSpeedComponent } from './weather-charts/five-day-wind-speed/five-day-wind-speed.component';
import { FiveDayHumidityComponent } from './weather-charts/five-day-humidity/five-day-humidity.component';
import { FiveDayWindDirectionComponent } from './weather-charts/five-day-wind-direction/five-day-wind-direction.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WeatherService} from "./services/weather.service";
import {MomentModule} from "angular2-moment";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {GeocodeService} from "./services/geocode.service";
import {MapService} from "./services/map.service";
import { ForecastComponent } from './forecast/forecast.component';
import {AngularSvgIconModule} from "angular-svg-icon";
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { ErrorMessageComponent } from './utils/error-message/error-message.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SixteenDayTempComponent,
    HostDirective,
    FiveDayWindSpeedComponent,
    FiveDayHumidityComponent,
    FiveDayWindDirectionComponent,
    ForecastComponent,
    DashboardComponent,
    MapComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatSelectModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    NgxChartsModule,
    ReactiveFormsModule,
    FormsModule,
    MomentModule,
    LeafletModule,
    AngularSvgIconModule,
    FlexLayoutModule,
    MatMenuModule,
    MatSnackBarModule
  ],
  providers: [DataVisualizationService, WeatherService, GeocodeService, MapService],
  bootstrap: [AppComponent],
  entryComponents: [SixteenDayTempComponent, FiveDayHumidityComponent, FiveDayWindDirectionComponent, FiveDayWindSpeedComponent, ErrorMessageComponent]
})
export class AppModule { }
