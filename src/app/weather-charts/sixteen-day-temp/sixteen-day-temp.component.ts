import {
  Component, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import * as moment from 'moment';


@Component({
  selector: 'app-five-day-temp',
  templateUrl: './sixteen-day-temp.component.html',
  styleUrls: ['./sixteen-day-temp.component.css']
})
export class SixteenDayTempComponent implements OnInit, OnDestroy {

  forecastSubscription: Subscription;
  feedSubscription: Subscription;
  modeSubscription: Subscription;
  graphData: {name: string, series: {name: string, value: number}[]}[] = [];
  name: string;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel;
  autoScale = false;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  @ViewChild('unit') unit;

  constructor(private weatherService: WeatherService) {
    this.name = '5-day Temp.';
  }
  ngOnInit() {
    this.forecastSubscription = this.weatherService.dailyForecast$.subscribe((res) => {
      const avg = [];
      const min = [];
      const max = [];
      res['list']
        .forEach((f) => {
          avg.push({name: moment(new Date(f.dt * 1000).toISOString()).format('MMM Do'), value: f.temp.day});
          min.push({name: moment(new Date(f.dt * 1000).toISOString()).format('MMM Do'), value: f.temp.min});
          max.push({name: moment(new Date(f.dt * 1000).toISOString()).format('MMM Do'), value: f.temp.max});
        });
      const data = [{name: 'Max', series: max}, {name: 'Min', series: min}];
      this.timedDataCycle(data);
    });
    this.modeSubscription = this.weatherService.measurementMode$.subscribe((mode) => {
      if (mode === 'metric') {
        this.yAxisLabel = '°C';
      } else {
        this.yAxisLabel = '°F';
      }
    });
  }

  ngOnDestroy() {
    this.forecastSubscription.unsubscribe();
    this.feedSubscription.unsubscribe();
  }

  timedDataCycle(data: any[]) {
    // data passed to chart must be immutable
    if (this.feedSubscription) {
      this.feedSubscription.unsubscribe();
    }
    let i = 0;
    const min = 0;
    const max = 1;
    const MAX_DAYS = 4;
    const temp = [{name: 'Min', series: [data[min]['series'][i]]}, {name: 'Max', series: [data[max]['series'][i]]}];
    i++;
    this.graphData = temp;
    this.feedSubscription = Observable.timer(0, 2000).subscribe(() => {
      if (data[min]['series'].length === i + 1) {
        i = 0;
      }
      if (temp[min]['series'].length === MAX_DAYS) {
        temp[min]['series'].splice(0, 1);
        temp[max]['series'].splice(0, 1);

      }
      temp[min]['series'].push(data[min]['series'][i]);
      temp[max]['series'].push(data[max]['series'][i]);
      i++;
      this.graphData = temp.slice();
    });
  }
}
