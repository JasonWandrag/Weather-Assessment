import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiKey = '53f9d8e4213222cf517d86dc406d67fc';

@Injectable()
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(lat, long) {
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ long +'&units=metric&APPID='+apiKey);
  }

}
