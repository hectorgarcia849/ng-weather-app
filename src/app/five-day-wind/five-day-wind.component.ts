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
  view: any[] = [300, 300];
  viewBar: any[] = [300, 300]
  colorScheme = {
    domain: ['#a10b91']
  };
  showXAxis = true;
  showYAxis = true;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Wind Direction';
  xAxisLabelBar = 'Wind Speed';
  showYAxisLabel = true;
  yAxisLabel = 'Degrees';
  yAxisLabelBar = 'meter/sec';
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
          const windDirection = [];
          const windSpeed = [];
          const present = new Date().getTime();
          data['list']
            .forEach((f) => {
              if (f.dt * 1000 > present) {
                const datetime = moment(new Date(f.dt * 1000).toISOString()).format('ddd [at] h:mm a');
                windDirection.push({name: datetime, value: f.wind.deg});
                windSpeed.push({name: datetime, value: f.wind.speed});
              }
            });
          this.graphDataWD = [{ name: 'Wind Direction', series: windDirection }];
          this.graphDataWS = windSpeed.slice(1, 20);
          console.log(this.graphDataWS);
        });
      });
  }

  onSelfDestruct() {
    this.onDestroy.emit(this.name);
  }
}
