import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private BASE_API_PATH = "https://api.openweathermap.org/data/2.5/weather?q";
  private APIKEY = "a84eecee5b791965827891fd911b13ff";
  //private BASE_API_PATH = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=a84eecee5b791965827891fd911b13ff";  

  constructor(private http: HttpClient) { }

  getWeather(city:string): Observable<any> {
    //return this.http.get<any>(this.BASE_API_PATH);
    return this.http.get<any>(this.BASE_API_PATH + '=' + city + '&appid=' + this.APIKEY);
  }

}
