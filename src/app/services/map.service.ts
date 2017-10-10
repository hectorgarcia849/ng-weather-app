import * as L from 'leaflet';
import {Injectable} from '@angular/core';
import {GeocodeService} from './geocode.service';
import {HttpClient} from "@angular/common/http";

@Injectable()

export class MapService {
  private mapOptions;
  private map;
  private marker;
  private icon;
  constructor(private geocodeService: GeocodeService, private http: HttpClient) {
    this.icon = L.icon({
      iconUrl: '../../assets/image/marker-icon.png',
      shadowUrl: '../../assets/image/marker-shadow.png',
      iconSize:     [24, 24], // size of the icon
      iconAnchor:   [24, 48]
    });
    L.Marker.prototype.options.icon = this.icon;
    this.mapOptions = {
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
        zoom: 5,
      center: L.latLng([ 46.879966, -121.726909 ])
    };
  }
  setMapReference(map: L.Map) {
    this.map = map;
    const init_lat = 46.879966;
    const init_lng = -121.726909;
    this.marker = new L.Marker(
      [ init_lat, init_lng ],
      {icon: this.icon}
    );
    this.geocodeService.reverseGeocodeRequest(init_lat.toString(), init_lng.toString(), (newAddress) => {
      this.marker.addTo(map);
    });

    // this.http.get('/services/mapservice/token').subscribe((res) => {
    //   mapbox.accessToken = res;
    //   const mapboxURL = 'mapbox://styles/mapbox/dark-v9';
    //   const greyscale = L.tileLayer(mapboxURL, {id: 'map'});
    //   const baseMaps = { 'Greyscale': greyscale };
    //   L.control.layers(baseMaps).addTo(this.map);
    // });

    this.map.on('click', (e) => {
      const lat = e['latlng'].lat;
      const lng = e['latlng'].lng;
      this.map.removeLayer(this.marker);
      this.marker = new L.Marker(
        [ lat, lng, {icon: this.icon}]);
      return this.geocodeService.reverseGeocodeRequest(lat, lng, (newAddress) => {
        this.marker.addTo(map);
      });
    });
  }

  getMapOptions() {
    return this.mapOptions;
  }
  updateMarker(newAddress: string) {
    this.map.removeLayer(this.marker);
    this.geocodeService.geocodeRequest(newAddress, (lat, lng) => {
        this.marker = new L.Marker(
          [ lat, lng ],
          {icon: this.icon}
        );
        this.map.flyTo([lat, lng], 12);
      });
  }
}
