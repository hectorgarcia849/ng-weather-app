import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../services/weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  modes = ['metric', 'imperial'];
  state;
  constructor(private weatherService: WeatherService) {
  }
  ngOnInit() {}
  onModeChange(mode: string) {
    this.weatherService.updateMeasurementMode(mode);
    this.state = 'enter';
  }
}
