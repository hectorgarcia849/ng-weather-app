import {
  Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {AbstractFunctionalUnit} from '../utils/functional-unit/functional-unit.component';
import {WeatherService} from "../services/weather.service";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-five-day-temp',
  templateUrl: './five-day-temp.component.html',
  styleUrls: ['./five-day-temp.component.css']
})
export class FiveDayTempComponent implements OnInit, OnDestroy, AbstractFunctionalUnit {

  forecastSubscription: Subscription;
  graphData: Object[] = [];
  name: string;

  // options
  view = [300, 300];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Temperature';
  autoScale = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  @Output() onDestroy: EventEmitter<string> = new EventEmitter<string>();
  @Input() data: any;
  @Input() viewContainerRef: ViewContainerRef;
  @ViewChild('unit') unit;

  constructor(private weatherService: WeatherService) {
    this.name = '5-day Temp.';
  }
  ngOnInit() {
    this.forecastSubscription = this.weatherService.dailyForecast$.subscribe((data) => {
      const avg = [];
      const min = [];
      const max = [];
      data['list']
        .forEach((f) => {
          avg.push({name: new Date(f.dt * 1000), value: f.temp.day});
          min.push({name: new Date(f.dt * 1000), value: f.temp.min});
          max.push({name: new Date(f.dt * 1000), value: f.temp.max});
        });
      this.graphData = [{name: 'Min', series: min}, {name: 'Max', series: max}];
    });
  }

  onSelfDestruct() {}

  ngOnDestroy() {
    this.forecastSubscription.unsubscribe();
  }
}
