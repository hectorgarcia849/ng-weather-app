import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {Subscription} from 'rxjs/Subscription';
import * as moment from 'moment';
import {Observable} from "rxjs";

@Component({
  selector: 'app-five-day-wind-speed',
  templateUrl: './five-day-wind-speed.component.html',
  styleUrls: ['./five-day-wind-speed.componentspeed.css']
})
export class FiveDayWindSpeedComponent implements OnInit, OnDestroy {
  name = 'five-day Wind';
  forecastSubscription: Subscription;
  feedSubscription: Subscription;
  modeSubscription: Subscription;
  graphDataWS: Object[] = [];
  colorScheme = {
    domain: ['#a10b91']
  };
  showXAxis = true;
  showYAxis = true;
  showLegend = false;
  showXAxisLabel = false;
  showYAxisLabel = true;
  xAxisLabelBar = 'Wind Speed';
  yAxisLabelBar;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.forecastSubscription = this.weatherService.hourlyForecast$.subscribe((data) => {
      const windSpeed = [];

      const present = new Date().getTime();
      data['list']
        .forEach((f) => {
          if (f.dt * 1000 > present) {
            const datetime = moment(new Date(f.dt * 1000).toISOString()).format('ddd [@] h:mm a');
            windSpeed.push({name: datetime, value: f.wind.speed});
          }
        });
      this.timedWSDataCycle(windSpeed);
    });
    this.modeSubscription = this.weatherService.measurementMode$
      .subscribe((mode) => {
        if (mode === 'metric') {
          this.yAxisLabelBar = 'meter/sec';
        } else {
          this.yAxisLabelBar = 'miles/hour';
        }
    });

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
}
