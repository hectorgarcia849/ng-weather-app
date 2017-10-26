import {NgModule} from '@angular/core';
import {WeatherGuardianComponent} from './weather-guardian.component';
import {CommonModule} from '@angular/common';
import {ForecastModule} from './forecast/forecast.module';
import {MapModule} from './map/map.module';
import {WeatherChartsDashboardModule} from './weather-charts-dashboard/weather-charts-dashboard.module';
import {WeatherGuardianRoutingModule} from './weather-guardian.routing.module';

@NgModule({
  declarations: [WeatherGuardianComponent],
  imports: [
    CommonModule,
    ForecastModule,
    MapModule,
    WeatherChartsDashboardModule,
    WeatherGuardianRoutingModule
  ],
  exports: [WeatherGuardianComponent]
})

export class WeatherGuardianModule {}
