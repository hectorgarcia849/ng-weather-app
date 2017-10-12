import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  MatButtonModule, MatIconModule, MatMenuModule,
  MatSnackBarModule, MatSelectModule
} from "@angular/material";
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DataVisualizationService} from "./services/data-visualization.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WeatherService} from "./services/weather.service";
import {GeocodeService} from "./services/geocode.service";
import {MapService} from "./services/map.service";
import { ErrorMessageComponent } from './utils/error-message/error-message.component';
import {WeatherChartsDashboardModule} from "./weather-charts-dashboard/weather-charts-dashboard.module";
import {MapModule} from "./map/map.module";
import {ForecastModule} from "./forecast/forecast.module";


@NgModule({
  declarations: [
    AppComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ForecastModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    MapModule,
    ReactiveFormsModule,
    WeatherChartsDashboardModule
  ],
  providers: [DataVisualizationService, WeatherService, GeocodeService, MapService],
  bootstrap: [AppComponent],
  entryComponents: [ErrorMessageComponent]
})
export class AppModule { }
