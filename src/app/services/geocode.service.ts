import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

@Injectable()

export class GeocodeService {
  url = '/services/geocodeservice/geocode';
  private selectedLocationSubject = new ReplaySubject<{location: string, lat: string, lng: string}>(1)
  selectedLocation$ = this.selectedLocationSubject.asObservable();

  constructor (private http: HttpClient, private matSnackBar: MatSnackBar) {}

  reverseGeocodeRequest(lat: string, lng: string, callback: (newAddress) => void) {
    this.http.get(`${this.url}/reverserequest?lat=${lat}&lng=${lng}`)
      .subscribe((response) => {
        const newAddress = response['results'][0].formatted;
        this.selectedLocationSubject.next({location: newAddress, lat, lng});
        callback(newAddress);
    });
  }
  geocodeRequest(newAddress: string, callback: (lat, lng) => void) {
    return this.http.get(`${this.url}/request?address=${newAddress}`)
      .subscribe(
        (response) => {
          if (response['results'].length > 0) {
            const lat = response['results'][0].geometry.lat;
            const lng = response['results'][0].geometry.lng;
            this.selectedLocationSubject.next({location: newAddress, lat, lng});
            callback(lat, lng);
          } else {
            const message = `Unable to locate ${newAddress} on servers`;
            const config = new MatSnackBarConfig();
            config.duration = 2500;
            config.extraClasses = ['snack-bar-message'];
            this.matSnackBar.open(message, null, config);
          }
        });
  }
}
