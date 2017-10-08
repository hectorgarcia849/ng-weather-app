import {Component, OnInit} from '@angular/core';
import {WeatherService} from "./services/weather.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  modes = ['metric', 'imperial'];

  constructor(private weatherService: WeatherService) {
  }
  ngOnInit() {
  }
  onModeChange(mode: string) {
    this.weatherService.updateMeasurementMode(mode);
  }
}
