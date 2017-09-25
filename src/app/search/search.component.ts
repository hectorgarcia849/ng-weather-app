import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {WeatherService} from "../services/weather.service";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  myControl: FormControl = new FormControl();

  options = ['Toronto', 'Port Credit', 'Brampton'];

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
  }
  onSelection(option: string) {
    this.weatherService.updateCity(option);
  }

}
