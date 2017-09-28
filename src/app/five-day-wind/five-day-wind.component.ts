import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewContainerRef} from '@angular/core';
import {AbstractFunctionalUnit} from '../utils/functional-unit/functional-unit.component';
import {WeatherService} from '../services/weather.service';
import {Subscription} from 'rxjs/Subscription';
import * as moment from 'moment';
import {Observable} from "rxjs";

@Component({
  selector: 'app-five-day-wind',
  templateUrl: './five-day-wind.component.html',
  styleUrls: ['./five-day-wind.component.css']
})
export class FiveDayWindComponent implements OnInit, OnDestroy, AbstractFunctionalUnit {
  name = 'five-day Wind';
  forecastSubscription: Subscription;
  feedSubscription: Subscription;
  graphDataWD: Object[] = [];
  graphDataWS: Object[] = [];
  view: any[] = [400, 200];
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
  xAxisLabelBar = 'Wind Speed';
  yAxisLabelBar = 'meter/sec';
  viewBar: any[] = [400, 200];

  @Output() onDestroy: EventEmitter<string> = new EventEmitter<string>();
  @Input() data: any = '';
  @Input() viewContainerRef: ViewContainerRef;
  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.forecastSubscription = this.weatherService.hourlyForecast$.subscribe((data) => {
      const windSpeed = [];
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
      const windDirection = [
        {name: 'ws0to1', series: windDirectionSeries.slice()},
        {name: 'ws1to2', series: windDirectionSeries.slice()},
        {name: 'ws2to3', series: windDirectionSeries.slice()},
        {name: 'ws3to4', series: windDirectionSeries.slice()},
        {name: 'ws4to5', series: windDirectionSeries.slice()},
        {name: 'wsAbove5', series: windDirectionSeries.slice()},
      ];
      const present = new Date().getTime();
      data['list']
        .forEach((f) => {
          if (f.dt * 1000 > present) {
            const datetime = moment(new Date(f.dt * 1000).toISOString()).format('ddd [at] h:mm a');
            windSpeed.push({name: datetime, value: f.wind.speed});
            windDirection[this.classifyWindSpeedByIndex(f.wind.speed)].series[this.classifyWindDirectionByIndex(f.wind.deg)].value++;
          }
        });

      this.timedWSDataCycle(windSpeed);
      this.graphDataWD = windDirection;
    });
  }

  classifyWindSpeedByIndex(windSpeed): number {
    const windSpeedClassifications = 5;
    if (windSpeed > windSpeedClassifications) {
      return 5;
    }
    for (let i = 0; i < windSpeedClassifications; i++) {
      if (windSpeed >= i && windSpeed < i + 1) {
        return i;
      }
    }
  }

  classifyWindDirectionByIndex(windDirection): number {
    const totalDegrees = 360;
    const part = 16;
    for (let i = 0; i < part; i++) {
      if (windDirection >= totalDegrees * (i / part) && windDirection < totalDegrees * ( i + 1 / part)) {
        return i;
      }
    }
  }

  timedWSDataCycle(data) {
    if (this.feedSubscription) {
      this.feedSubscription.unsubscribe();
    }
    let i = 0;
    let j = 8;
    this.feedSubscription = Observable.timer(0, 4000).subscribe(() => {
      this.graphDataWS = data.slice(i, j);
      i += 8;
      j += 8;
      if (i >= data.length) {
        i = 0;
        j = 7;
      }
      if (j > data.length) {
        j = data.length - 1;
      }
    });
  }

  ngOnDestroy() {
    this.forecastSubscription.unsubscribe();
    this.feedSubscription.unsubscribe();
  }
  onSelfDestruct() {
    this.onDestroy.emit(this.name);
  }
}
