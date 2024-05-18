import { Injectable } from '@angular/core';

export interface time {
  hour:number
  min:number,
  sec:number,
}

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  constructor() { }

  getTime():time {
    let time =new Date();
    return {
      hour:time.getHours(),
      min:time.getMinutes(),
      sec:time.getSeconds(),
    }
  }
}
