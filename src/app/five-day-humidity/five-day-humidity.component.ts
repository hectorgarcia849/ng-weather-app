import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewContainerRef} from '@angular/core';
import {AbstractFunctionalUnit} from '../utils/functional-unit/functional-unit.component';
import {Subscription} from "rxjs/Subscription";
import {WeatherService} from "../services/weather.service";
import * as moment from 'moment';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-five-day-humidity',
  templateUrl: './five-day-humidity.component.html',
  styleUrls: ['./five-day-humidity.component.css']
})
export class FiveDayHumidityComponent implements OnInit, OnDestroy, AbstractFunctionalUnit {
  name = 'five-day humidity';
  forecastSubscription: Subscription;
  feedSubscription: Subscription;
  graphData: Object[] = [];

  view: any[] = [250, 250];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Humidity';
  colorScheme = {
    domain: ['#a10b91']
  };
  @Output() onDestroy: EventEmitter<string> = new EventEmitter<string>();
  @Input() data: any = '';
  @Input() viewContainerRef: ViewContainerRef;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.forecastSubscription = this.weatherService.hourlyForecast$.subscribe((data) => {
      const humidity = [];
      const present = new Date().getTime();
      data['list']
        .forEach((f) => {
          if (f.dt * 1000 > present) {
            const datetime = moment(new Date(f.dt * 1000).toISOString()).format('ddd [at] h:mm a');
            humidity.push({name: datetime, value: f.main.humidity});
          }
        });
      this.timedDataCycle(humidity);
    });
  }
  ngOnDestroy() {
    this.forecastSubscription.unsubscribe();
    this.feedSubscription.unsubscribe();
  }
  onSelfDestruct() {
  }
  timedDataCycle(data: any[]) {
    if (this.feedSubscription) {
      this.feedSubscription.unsubscribe();
    }
    let i = 0;
    let j = 8;
    let k = 0;
    this.feedSubscription = Observable.timer(0, 4000).subscribe(() => {
      this.graphData = data.slice(i, j);
      k++;
      if (k % 8 === 0) {
        k = 0;
      }
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
}
