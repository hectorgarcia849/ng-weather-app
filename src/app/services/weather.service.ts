import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {GeocodeService} from "./geocode.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material";

@Injectable()
export class WeatherService {

  private locationSubscription = new Subscription();
  private dailyForecastSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  dailyForecast$: Observable<any> = this.dailyForecastSubject.asObservable();
  private hourlyForecastSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  hourlyForecast$: Observable<any> = this.hourlyForecastSubject.asObservable();
  private measurementModeSubject = new BehaviorSubject<any>('metric');
  measurementMode$ = this.measurementModeSubject.asObservable();
  private measurementModeSubscription = new Subscription();
  private mode = 'metric';
  private location;
  url = "services/weatherservice";
  constructor(private http: HttpClient, private geocodeService: GeocodeService, private matSnackBar: MatSnackBar) {
    this.locationSubscription = this.geocodeService.selectedLocation$.subscribe((location) => {
      this.location = location;
      this.getDailyForecast(location.lat, location.lng)
        .subscribe(
          (response) => {
            this.updateDailyForecast(response);
          },
          (error) => {
            this.createErrorMessage();
          }
        );
      this.getHourlyForecast(location.lat, location.lng)
        .subscribe(
          (response) => {
            this.updateHourlyForecast(response);
          },
          (error) => {
            this.createErrorMessage();
          }
        );
    });
    this.measurementModeSubscription = this.measurementModeSubject.asObservable().subscribe((mode) => {
      if (this.location) {
        console.log('changed to', mode);
        this.mode = mode;
        this.getDailyForecast(this.location.lat, this.location.lng)
          .subscribe((response) => {
              this.updateDailyForecast(response); },
            (error) => {
              this.createErrorMessage();
            }
          );
        this.getHourlyForecast(this.location.lat, this.location.lng).subscribe((response) => {
          this.updateHourlyForecast(response);
        });
      }
    });
  }

  updateDailyForecast(forecast: any) {
    this.dailyForecastSubject.next(forecast);
  }

  updateHourlyForecast(forecast: any) {
    this.hourlyForecastSubject.next(forecast);
  }

  private getDailyForecast(lat: string, lng: string): Observable<any> {
    const query = `/daily?lat=${lat}&lng=${lng}&cnt=16&mode=${this.mode}`;
    return this.http.get(`${this.url}${query}`);
  }

  private getHourlyForecast(lat: string, lng: string): Observable<any> {
    const query = `/hourly?lat=${lat}&lng=${lng}&mode=${this.mode}`;
    return this.http.get(`${this.url}${query}`);
  }
  updateMeasurementMode(mode: string) {
    this.measurementModeSubject.next(mode);
  }
  createErrorMessage() {
    const message = `Unable to retreive weathers from servers`;
    const config = new MatSnackBarConfig();
    config.duration = 2500;
    config.extraClasses = ['snack-bar-message'];
    this.matSnackBar.open(message, null, config);
  }
}
