import {MAPBOX_API_TOKEN} from '../../../tokens.js';
import * as L from 'leaflet';
import * as mapbox from 'mapbox-gl';
import {Injectable} from "@angular/core";
import {GeocodeService} from "./geocode.service";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {DomSanitizer} from "@angular/platform-browser"

@Injectable()

export class MapService {

  private selectedAddressSubject = new ReplaySubject<string>(1);
  selectedAddress$ = this.selectedAddressSubject.asObservable();
  map;
  marker;
  layersControl;
  layers;

  constructor(private geocodeService: GeocodeService,
              private santizer: DomSanitizer) {
  }

  setMapReference(map: L.Map) {
    this.map = map;
    const iconUrl = '../assets/image/marker-icon.png';
    const shadowUrl = '../assets/image/marker-shadow.png';
    this.marker = new L.Marker(
      [ 46.879966, -121.726909 ],
      {icon: L.icon(
        { iconUrl,
          shadowUrl,
          iconSize: [24, 24],
          iconAnchor: [24, 48] })
      }
    );

    this.marker.addTo(map);

    mapbox.accessToken = MAPBOX_API_TOKEN;
    const mapboxURL = 'mapbox://styles/mapbox/dark-v9';
    const greyscale = L.tileLayer(mapboxURL, {id: 'map'});
    const baseMaps = { 'Greyscale': greyscale };
    L.control.layers(baseMaps).addTo(this.map);

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
              iconAnchor: [24, 48],
            })
          }
        );
        this.map.flyTo([lat, lng], 12);
        this.marker.addTo(this.map).bindPopup("some message");
      });
  }
  updateSelectedAddress(address: string) {
    this.selectedAddressSubject.next(address);
  }
}
