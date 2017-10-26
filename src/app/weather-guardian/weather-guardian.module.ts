import {NgModule} from '@angular/core';
import {WeatherGuardianComponent} from './weather-guardian.component';
import {CommonModule} from '@angular/common';
import {ForecastModule} from './forecast/forecast.module';
import {MapModule} from './map/map.module';
import {WeatherGuardianRoutingModule} from './weather-guardian.routing.module';
import {WeatherChartsDashboardModule} from './weather-charts-dashboard/weather-charts-dashboard.module';

@NgModule({
  declarations: [WeatherGuardianComponent],
  imports: [
    CommonModule,
    MapModule,
    ForecastModule,
    WeatherChartsDashboardModule,
    WeatherGuardianRoutingModule
  ],
  exports: [WeatherGuardianComponent],
  entryComponents: []
})

export class WeatherGuardianModule {}
