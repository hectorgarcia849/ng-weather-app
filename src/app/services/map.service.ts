import * as L from 'leaflet';
import {Injectable} from "@angular/core";
import {GeocodeService} from "./geocode.service";
import {ReplaySubject} from "rxjs/ReplaySubject";

@Injectable()

export class MapService {

  private selectedAddressSubject = new ReplaySubject<string>(1);
  selectedAddress$ = this.selectedAddressSubject.asObservable();
  map;
  marker;
  layersControl;
  layers;

  constructor(private geocodeService: GeocodeService) {}

  setMapReference(map: L.Map) {
    this.map = map;
    this.marker = new L.Marker(
      [ 46.879966, -121.726909 ],
      {icon: L.icon(
        { iconUrl: '../assets/image/marker-icon.png',
          shadowUrl: '../assets/image/marker-shadow.png',
          iconSize: [24, 24],
          iconAnchor: [24, 48] })
      }
    );


    this.map.on('click', (e) => {
      console.log(e['latlng']);
      const lat = e['latlng'].lat;
      const lng = e['latlng'].lng;
      this.map.removeLayer(this.marker);
      this.marker = new L.Marker(
        [ lat, lng,
          {icon: L.icon(
            { iconUrl: '/assets/image/marker-icon.png',
              shadowUrl: '/assets/image/marker-shadow.png',
              iconSize: [24, 24],
              iconAnchor: [24, 48]
            })
          }]);
      this.marker.addTo(map);
      return this.geocodeService.reverseGeocodeRequest(lat, lng, (newAddress) => {
        this.updateSelectedAddress(newAddress);
      });
    });
  }

  updateMarker(newAddress: string) {
    this.map.removeLayer(this.marker);
    this.geocodeService.geocodeRequest(newAddress, (lat, lng) => {
        this.marker = new L.Marker(
          [ lat, lng ],
          {icon: L.icon(
            { iconUrl: '../assets/image/marker-icon.png',
              shadowUrl: '../assets/image/marker-shadow.png',
              iconSize: [24, 24],
              iconAnchor: [24, 48] })
          }
        );
        this.marker.addTo(this.map);
      });
  }
  updateSelectedAddress(address: string) {
    this.selectedAddressSubject.next(address);
  }
}
