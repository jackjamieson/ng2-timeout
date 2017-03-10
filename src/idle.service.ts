import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class IdleService {

  private timeToIdle: number;
  private timeToTimeout: number;

  private isIdle: boolean;

  private timeDiff: number;

  private timestart: number;
  private timeend: number;

  constructor() {
    this.timeToIdle = 60 * 20; // default 20 min
    this.timeToTimeout = 60 * 1; // default timeout 1 min

    // set initial end time to now + time until user is considered idle
    this.timeend = Math.floor(new Date().getTime() / 1000) + this.timeToIdle + 1;
  }

  // lets you perform actions after the user is deemed idle
  watchIdle(): Observable<boolean> {
    let timer = Observable.interval(1000).map((x) => {

      this.timestart = Math.floor(new Date().getTime() / 1000);
      this.timeDiff = this.timeend - this.timestart;

      if (this.timeDiff <= 0) {
        this.isIdle = true;
        return true;
      }
      return false;
    });
    return timer;
  }

  // lets you perform actions after the user is deemed timed out
  // returns the countdown for timeout
  watchTimeout(): Observable<string> {
    let count = 0;
    let timer = Observable.interval(1000).map((x) => {

      if (this.isIdle) { count++; } else { count = 0; }
      return this.timeToTimeout - count + '';
    });
    return timer;
  }

  interruptIdle(): void {
    // you can only interrupt the idle check if you are not already idle
    if (!this.isIdle) {
      this.timeend = Math.floor(new Date().getTime() / 1000) + this.timeToIdle + 1;
    }
  }

  // resets the timeout by declaring that the user is not idle and updating the end time
  interruptTimeout(): void {
    this.isIdle = false;
    this.timeend = Math.floor(new Date().getTime() / 1000) + this.timeToIdle + 1;
  }

  // set the time in seconds to declare the user is idle
  setTimeToIdle(time: number): void {
    this.timeToIdle = time;
  }

  // set the time in seconds to declare the user has timed out
  setTimeToTimeout(time: number): void {
    this.timeToTimeout = time;
  }

}
