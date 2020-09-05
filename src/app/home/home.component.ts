import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  weatherDetail;

  searchForm: FormGroup;

  cityArray = JSON.parse(localStorage.getItem('cityName')) || [];

  cityFilterArray;

  selectForm: FormGroup;

  constructor(private _weatherService: WeatherService, private _fb: FormBuilder) { }

  ngOnInit(): void {
    //this.getWeather('London');
    this.createSearchForm();
    this.createSelectForm();
    this.filterArray();
  }

  createSearchForm() {
    this.searchForm = this._fb.group({
      city: ['', Validators.compose([Validators.required])]
    })
  }

  createSelectForm() {
    this.selectForm = this._fb.group({
      selectCity: ['', Validators.compose([Validators.required])]
    })
  }

  searchFormSubmit() {
    //console.log(this.searchForm.value);

    this._weatherService.getWeather(this.searchForm.value.city).subscribe(res => {
      //console.log(res);
      this.weatherDetail = res;

      this.cityArray.push(this.searchForm.value.city);
      //console.log(this.cityArray);
      localStorage.setItem('cityName', JSON.stringify(this.cityArray));
      this.filterArray();
    })

  }

  selectFormSubmit() {
    //console.log(this.selectForm.value);
    this._weatherService.getWeather(this.selectForm.value.selectCity).subscribe(res => {
      //console.log(res)
      this.weatherDetail = res;
    })
  }

  filterArray(){
    this.cityFilterArray = this.cityArray.filter((currentValue, currentIndex, self)=>{
      return  self.indexOf(currentValue) === currentIndex;
    })
  }

}
