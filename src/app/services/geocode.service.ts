import {OPENCAGE_API_KEY} from '../../../tokens.js';
import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs/ReplaySubject";

@Injectable()

export class GeocodeService {
  url = 'http://api.opencagedata.com/geocode/v1/json?';
  private selectedLocationSubject = new ReplaySubject<{location: string, lat: string, lng: string}>(1)
  selectedLocation$ = this.selectedLocationSubject.asObservable();

  constructor (private http: HttpClient) {}

  reverseGeocodeRequest(lat: string, lng: string, callback: (newAddress) => void) {
    this.http.get(`${this.url}q=${lat}+${lng}&key=${OPENCAGE_API_KEY}`)
      .subscribe((response) => {
        const newAddress = response['results'][0].formatted;
        this.selectedLocationSubject.next({location: newAddress, lat, lng});
        console.log('location update');
        callback(newAddress);
    });
  }
  geocodeRequest(newAddress: string, callback: (lat, lng) => void) {
    return this.http.get(`${this.url}q=${newAddress}&key=${OPENCAGE_API_KEY}`)
      .subscribe((response) => {
        const lat = response['results'][0].geometry.lat;
        const lng = response['results'][0].geometry.lng;
        this.selectedLocationSubject.next({location: newAddress, lat, lng});
        console.log('location update');
        callback(lat, lng);
      });
  }

}
