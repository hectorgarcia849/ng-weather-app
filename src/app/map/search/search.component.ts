import {Component, OnInit, ViewChild} from '@angular/core';
import {MapService} from "../../services/map.service";
import {Subscription} from "rxjs/Subscription";
import {GeocodeService} from "../../services/geocode.service";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  locationSubscription: Subscription;
  @ViewChild('input_text')input_text;

  constructor(private geocodeService: GeocodeService, private mapService: MapService) { }

  ngOnInit() {
    this.locationSubscription = this.geocodeService.selectedLocation$
      .subscribe((location) => { this.input_text = location.location; });
  }
  onCityEntered() {
    this.mapService.updateMarker(this.input_text);
  }

  clearInputText() {
    this.input_text = '';
  }
}
