import { Component, OnInit } from '@angular/core';
import { faCar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

interface Time {
  hour: number;
  min: number;
  sec: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'carParking';
  Timer1: Time = { hour: 0, min: 0, sec: 0 };
  Timer2: Time = { hour: 0, min: 0, sec: 0 };
  faCar: IconDefinition = faCar;
  carsParking: number = 0;
  B1Status!: boolean;
  B2Status!: boolean;
  T1!: any;
  T2!: any;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    setInterval(() => {
      this.pOne().subscribe((data) => {
        this.B1Status = data;
        if (this.B1Status === false) {
          if (!this.T1) {
            this.startTimer(this.Timer1, 'T1');
            this.carsParking++;
          }
        } else {
          if (this.T1) {
            this.resetTimer(this.Timer1, 'T1');
            this.carsParking--;
          }
        }
      });

      this.pTwo().subscribe((data) => {
        this.B2Status = data;
        if (this.B2Status === false) {
          if (!this.T2) {
            this.startTimer(this.Timer2, 'T2');
            this.carsParking++;
          }
        } else {
          if (this.T2) {
            this.resetTimer(this.Timer2, 'T2');
            this.carsParking--;
          }
        }
      });
    }, 1000);
  }

  startTimer(timer: Time, intervalName: 'T1' | 'T2'): void {
    this[intervalName] = setInterval(() => {
      timer.sec++;
      if (timer.sec >= 60) {
        timer.sec = 0;
        timer.min++;
      }
      if (timer.min >= 60) {
        timer.min = 0;
        timer.hour++;
      }
      if (timer.hour >= 12) {
        timer.hour = 0;
      }
    }, 1000);
  }

  resetTimer(timer: Time, intervalName: 'T1' | 'T2'): void {
    clearInterval(this[intervalName]);
    this[intervalName] = null;
    timer.hour = 0;
    timer.min = 0;
    timer.sec = 0;
  }

  pOne(): Observable<boolean> {
    return this.httpService.parkingOne();
  }

  pTwo(): Observable<boolean> {
    return this.httpService.parkingTwo();
  }
}

