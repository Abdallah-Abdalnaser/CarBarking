import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { time } from './time.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  ApiLink:String = "https://smart-home-b486c-default-rtdb.firebaseio.com/";
  constructor(private http:HttpClient) {
  }
  parkingOne() {
    return this.http.get<boolean>(`${this.ApiLink}parkingOne.json`)
  }
  parkingTwo() {
    return this.http.get<boolean>(`${this.ApiLink}parkingTwo.json`)
  }
}
