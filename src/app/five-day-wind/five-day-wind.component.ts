import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import {AbstractFunctionalUnit} from '../utils/functional-unit/functional-unit.component';
import {WeatherService} from '../services/weather.service';
import {Subscription} from 'rxjs/Subscription';
import * as moment from 'moment';

@Component({
  selector: 'app-five-day-wind',
  templateUrl: './five-day-wind.component.html',
  styleUrls: ['./five-day-wind.component.css']
})
export class FiveDayWindComponent implements OnInit, AbstractFunctionalUnit {
  name = 'five-day Wind';
  forecastSubscription: Subscription;
  citySubscription: Subscription;
  graphDataWD: Object[] = [];
  graphDataWS: Object[] = [];
  city: string;
  view: any[] = [600, 300];
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
  viewBar: any[] = [600, 300]

  @Output() onDestroy: EventEmitter<string> = new EventEmitter<string>();
  @Input() data: any = '';
  @Input() viewContainerRef: ViewContainerRef;
  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.citySubscription = this.weatherService.city$
      .subscribe((city) => {
        this.city = city;
        this.forecastSubscription = this.weatherService.hourlyForecast$.subscribe((data) => {
          //const windDirection = [];
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
          console.log(windDirection);
          const present = new Date().getTime();
          data['list']
            .forEach((f) => {
              if (f.dt * 1000 > present) {
                const datetime = moment(new Date(f.dt * 1000).toISOString()).format('ddd [at] h:mm a');
                //windDirection.push({name: f.wind.deg, value: f.wind.speed});
                windSpeed.push({name: datetime, value: f.wind.speed});
                windDirection[this.classifyWindSpeedByIndex(f.wind.speed)].series[this.classifyWindDirectionByIndex(f.wind.deg)].value++;
              }
            });
          //this.graphDataWD = [{ name: 'Wind Direction', series: windDirection.slice(1, 10)}];
          this.graphDataWD = windDirection;
          this.graphDataWS = windSpeed.slice(1, 20);
          console.log(this.graphDataWD);
        });
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

  onSelfDestruct() {
    this.onDestroy.emit(this.name);
  }
}
