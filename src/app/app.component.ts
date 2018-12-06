import { Component, OnInit } from '@angular/core';
import { WeatherService } from './_service/weather.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  loader = true;
  positionError = {
    denied: false,
    unavailable: false,
    timeout: false
  }
  geoLocation: object;
  geoWeather: object;

  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    this.getLocation();
  }

  getLocation() {
    this.loader = true;
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geoLocation = position,
          this.searchWeather();
        },
        error => {
          switch (error.code) {
            case 1:
              this.positionError['denied'] = true;
              this.positionError['unavailable'] = false;
              this.positionError['timeout'] = false;
              this.loader = false;
              break;
            case 2:
              this.positionError['denied'] = false;
              this.positionError['unavailable'] = true;
              this.positionError['timeout'] = false;
              this.loader = false;
              break;
            case 3:
              this.positionError['denied'] = false;
              this.positionError['unavailable'] = false;
              this.positionError['timeout'] = true;
              this.loader = false;
              break;
          }
        }
      );
    };
  }

  searchWeather() {
    this.loader = true;
    this._weatherService.getWeather(this.geoLocation['coords']['latitude'], this.geoLocation['coords']['longitude']).subscribe(
      data => {
        this.geoWeather = data;
      },
      err => console.error(err),
      () => this.loader = false
    );
  }

}
