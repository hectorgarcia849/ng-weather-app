import {Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {WeatherService} from "../../services/weather.service";
import * as moment from 'moment';

@Component({
  selector: 'app-five-day-wind-direction',
  templateUrl: './five-day-wind-direction.component.html',
  styleUrls: ['./five-day-wind-direction.component.css']
})
export class FiveDayWindDirectionComponent implements OnInit, OnDestroy {
  name = 'five-day Wind Direction';
  forecastSubscription: Subscription;
  graphDataWD: Object[] = [];
  colorScheme = {
    domain: ['#a10b91']
  };
  showXAxis = true;
  showYAxis = true;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Wind Direction';
  showYAxisLabel = true;
  yAxisLabel = 'Degrees';

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {

    this.forecastSubscription = this.weatherService.hourlyForecast$.subscribe((data) => {
      const windDirectionSeries = [
        {name: 'N', value: 0},
        {name: 'NNE', value: 0},
        {name: 'NE', value: 0},
        {name: 'ENE', value: 0},
        {name: 'E', value: 0},
        {name: 'ESE', value: 0},
        {name: 'SE', value: 0},
        {name: 'SSE', value: 0},
        {name: 'S', value: 0},
        {name: 'SSW', value: 0},
        {name: 'SW', value: 0},
        {name: 'WSW', value: 0},
        {name: 'W', value: 0},
        {name: 'WNW', value: 0},
        {name: 'NW', value: 0},
        {name: 'NNW', value: 0}
      ];
      const windDirection = [];
      Array.from(new Set(data['list']
        .map(f => moment(new Date(f.dt * 1000).toISOString()).format('MMM Do'))))
        .forEach((date) => {
          windDirection.push({name: date, series: windDirectionSeries.slice()});
        });
      data['list']
        .forEach((f) => {
          const date = moment(new Date(f.dt * 1000).toISOString()).format('MMM Do');
          const index = windDirection.findIndex(function(element) { return element.name === date; });
          windDirection[index].series[this.classifyWindDirectionByIndex(f.wind.deg)].value++;
        });
      this.graphDataWD = windDirection;
    });
  }

  ngOnDestroy() {
    this.forecastSubscription.unsubscribe();
  }

  classifyWindDirectionByIndex(windDirection): number {
    const totalDegrees = 360;
    const part = 16;
    for (let i = 0; i < part; i++) {
      if (windDirection >= totalDegrees * (i / part) && windDirection < totalDegrees * ( (i + 1) / part)) {
        return i;
      }
    }
  }
}
