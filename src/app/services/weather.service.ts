import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {OPENWEATHER_API_KEY} from '../../../tokens.js';
import {GeocodeService} from "./geocode.service";

@Injectable()
export class WeatherService {

  private locationSubscription: Subscription = new Subscription();
  private dailyForecastSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  dailyForecast$: Observable<any> = this.dailyForecastSubject.asObservable();
  private hourlyForecastSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  hourlyForecast$: Observable<any> = this.hourlyForecastSubject.asObservable();

  url = "http://api.openweathermap.org/data/2.5/forecast";
  constructor(private http: HttpClient, private geocodeService: GeocodeService) {
    this.locationSubscription = this.geocodeService.selectedLocation$.subscribe((location) => {
      this.getDailyForecast(location.lat, location.lng).subscribe((forecast) => {
        this.updateDailyForecast(forecast);
      });
      this.getHourlyForecast(location.lat, location.lng).subscribe((forecast) => {
        this.updateHourlyForecast(forecast);
      });
    });
  }

  updateDailyForecast(forecast: any) {
    this.dailyForecastSubject.next(forecast);
  }

  updateHourlyForecast(forecast: any) {
    this.hourlyForecastSubject.next(forecast);
  }

  getDailyForecast(lat: string, lng: string): Observable<any> {
    const query = `/daily?lat=${lat}&lon=${lng}&cnt=16&appid=${OPENWEATHER_API_KEY}`;
    return this.http.get(`${this.url}${query}`);
  }

  getHourlyForecast(lat: string, lng: string): Observable<any> {
    const query = `?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}`;
    return this.http.get(`${this.url}${query}`);
  }
}
