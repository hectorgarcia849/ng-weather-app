import {MAPBOX_API_TOKEN} from '../../../tokens.js';
import * as L from 'leaflet';
import * as mapbox from 'mapbox-gl';
import {Injectable} from "@angular/core";
import {GeocodeService} from "./geocode.service";


@Injectable()

export class MapService {
  private mapOptions;
  private map;
  private marker;
  // layersControl;
  // layers;

  constructor(private geocodeService: GeocodeService) {
    this.mapOptions = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
        zoom: 5,
      center: L.latLng([ 46.879966, -121.726909 ])
    };
  }
  setMapReference(map: L.Map) {
    this.map = map;
    const iconUrl = '../assets/image/marker-icon.png';
    const shadowUrl = '../assets/image/marker-shadow.png';
    const init_lat = 46.879966;
    const init_lng = -121.726909;
    this.marker = new L.Marker(
      [ init_lat, init_lng ],
      {icon: L.icon(
        { iconUrl,
          shadowUrl,
          iconSize: [24, 24],
          iconAnchor: [24, 48] })
      }
    );
    this.geocodeService.reverseGeocodeRequest(init_lat.toString(), init_lng.toString(), (newAddress) => {
      this.marker.addTo(map);
    });

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

      return this.geocodeService.reverseGeocodeRequest(lat, lng, (newAddress) => {
        this.marker.addTo(map);
      });
    });
  }

  getMapOptions() {
    return this.mapOptions;
  }

  getMapReference() {
    return this.map;
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
}
