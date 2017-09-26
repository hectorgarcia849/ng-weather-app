import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import {AbstractFunctionalUnit} from '../utils/functional-unit/functional-unit.component';
import {Subscription} from "rxjs/Subscription";
import {WeatherService} from "../services/weather.service";
import * as moment from 'moment';

@Component({
  selector: 'app-five-day-humidity',
  templateUrl: './five-day-humidity.component.html',
  styleUrls: ['./five-day-humidity.component.css']
})
export class FiveDayHumidityComponent implements OnInit, AbstractFunctionalUnit {
  name = 'five-day humidity';
  forecastSubscription: Subscription;
  citySubscription: Subscription;
  graphData: Object[] = [];
  city: string;

  view: any[] = [600, 600];

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
    this.citySubscription = this.weatherService.city$
      .subscribe((city) => {
        this.city = city;
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
          this.graphData = humidity;
        });
      });
  }
  onSelfDestruct() {
  }
}
