import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from "../services/weather.service";
import {Subscription} from "rxjs/Subscription";
import * as moment from 'moment';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit, OnDestroy {
  tileProp = {cols: 1, rows: 2, color: 'clear'};
  fullForecastTiles = [];
  fiveForecastTiles = [];
  forecastSubscription: Subscription;
  city = '';
  modeSubscription: Subscription;
  degrees;
  constructor(private weatherService: WeatherService) {
    this.forecastSubscription = this.weatherService.dailyForecast$.subscribe((forecast) => {
      this.city = forecast['city'].name;
      this.fullForecastTiles = [];
      forecast['list'].forEach((data) => {
        const date = moment(new Date(data.dt * 1000).toISOString()).format('ddd MMM Do');
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const temp = {
          max: Math.round(data.temp.max),
          min: Math.round(data.temp.min),
          day: Math.round(data.temp.day),
          night: Math.round(data.temp.night)
        };
        this.fullForecastTiles.push({date, description, icon, temp});
      });
      this.fiveForecastTiles = this.fullForecastTiles.slice(0, 5);
    });
    this.modeSubscription = this.weatherService.measurementMode$
      .subscribe((mode) => {
        if (mode === 'metric') {
          this.degrees = '°C';
        } else {
          this.degrees = '°F';
        }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.modeSubscription.unsubscribe();
  }

  selectIcon(icon: string): string {
    return `assets/icons/animated/${icon}.svg`;
  }
}
