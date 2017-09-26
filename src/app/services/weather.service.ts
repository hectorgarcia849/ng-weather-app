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
  private dailyForecastSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  dailyForecast$: Observable<any> = this.dailyForecastSubject.asObservable();
  private hourlyForecastSubject: ReplaySubject<any> = new ReplaySubject<any>(1);
  hourlyForecast$: Observable<any> = this.hourlyForecastSubject.asObservable();

  url = "http://api.openweathermap.org/data/2.5/forecast";
  constructor(private http: HttpClient) {
    this.citySubscription = this.city$.subscribe((city) => {
      this.getDailyForecast(city).subscribe((forecast) => {
        console.log(forecast);
        this.updateDailyForecast(forecast);
      });
      this.getHourlyForecast(city).subscribe((forecast) => {
        console.log(forecast);
        this.updateHourlyForecast(forecast);
      });
    });
  }

  updateCity(city: string) {
    this.citySubject.next(city);
  }

  updateDailyForecast(forecast: any) {
    this.dailyForecastSubject.next(forecast);
  }

  updateHourlyForecast(forecast: any) {
    this.hourlyForecastSubject.next(forecast);
  }

  getDailyForecast(city: string): Observable<any> {
    const query = `/daily?q=${city}&cnt=16&appid=${WeatherService.APIKEY}`;
    return this.http.get(`${this.url}${query}`);
  }

  getHourlyForecast(city: string): Observable<any> {
    const query = `?q=${city}&appid=${WeatherService.APIKEY}`;
    return this.http.get(`${this.url}${query}`);
  }
}
