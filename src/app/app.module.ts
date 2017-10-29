import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataVisualizationService} from './services/data-visualization.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WeatherService} from './services/weather.service';
import {GeocodeService} from './services/geocode.service';
import {MapService} from './services/map.service';
import { ErrorDialogComponent } from './utils/error-message/error-dialog.component';
import {AppRoutingModule} from './app-routing.module';
import {MaterialsModule} from './materials/materials.module';
import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './loading/loading.component';
import {WeatherChartsDashboardModule} from './weather-guardian/weather-charts-dashboard/weather-charts-dashboard.module';
import {FiveDayWindSpeedComponent} from './weather-guardian/weather-charts-dashboard/five-day-wind-speed/five-day-wind-speed.component';
import {FiveDayHumidityComponent} from './weather-guardian/weather-charts-dashboard/five-day-humidity/five-day-humidity.component';
import {FiveDayWindDirectionComponent} from './weather-guardian/weather-charts-dashboard/five-day-wind-direction/five-day-wind-direction.component';
import {SixteenDayTempComponent} from './weather-guardian/weather-charts-dashboard/sixteen-day-temp/sixteen-day-temp.component';
import {ModalModule} from "ngx-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    ErrorDialogComponent,
    HeaderComponent,
    LoadingComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MaterialsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    WeatherChartsDashboardModule,
    ModalModule.forRoot()
  ],
  providers: [DataVisualizationService, WeatherService, GeocodeService, MapService],
  bootstrap: [AppComponent],
  entryComponents:
    [
      ErrorDialogComponent,
      FiveDayWindSpeedComponent,
      FiveDayHumidityComponent,
      FiveDayWindDirectionComponent,
      SixteenDayTempComponent
    ]
})
export class AppModule { }
