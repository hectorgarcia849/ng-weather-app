import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from "../services/map.service";
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  mapOptions;

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.mapOptions = this.mapService.getMapOptions();
  }

  onMapReady(map: L.Map) {
    this.mapService.setMapReference(map);
  }

}
