import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {WeatherService} from "../services/weather.service";
import {MapService} from "../services/map.service";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  addressSubscription: Subscription;
  constructor(private mapService: MapService) { }
  @ViewChild('input_text')input_text;
  ngOnInit() {
    this.addressSubscription = this.mapService.selectedAddress$
      .subscribe((location) => { console.log(location); this.input_text = location; });
  }
  onSelection(option: string) {
  }
  onCityEntered() {
    this.mapService.updateMarker(this.input_text);
  }

}
