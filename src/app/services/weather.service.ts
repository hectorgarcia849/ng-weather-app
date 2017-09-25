import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {ReplaySubject} from "rxjs/ReplaySubject";

@Injectable()
export class WeatherService {
  static APIKEY = 'e74134e81abcf128b37475344db5586c';
  private citySubject: ReplaySubject<string> = new ReplaySubject<string>(1);
  city$: Observable<string> = this.citySubject.asObservable();
  citySubscription: Subscription = new Subscription();
  private forecastSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  forecast$: Observable<any> = this.forecastSubject.asObservable();
  url = "http://api.openweathermap.org/data/2.5/forecast";
  constructor(private http: HttpClient) {
    this.citySubscription = this.city$.subscribe((city) => {
      this.getForecast(city).subscribe((forecast) => {
        console.log(forecast);
        this.updateForecast(forecast);
      });
    });
  }

  updateCity(city: string) {
    this.citySubject.next(city);
  }
  updateForecast(forecast: any) {
    this.forecastSubject.next(forecast);
  }

  getForecast(city: string): Observable<any> {
    const query = `?q=${city}&appid=${WeatherService.APIKEY}`;
    return this.http.get(`${this.url}${query}`);
  }

}
