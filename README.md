# ng2-timeout
Creates observables for user idle and timeout with manual interrupts.  Detects interrupts across browser tabs with [storage-emitter](https://github.com/alekseykulikov/storage-emitter).

## Installation

To install this library, run:

```bash
$ npm install ng2-timeout --save
```

## Consuming library

Import library in any Angular application from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import library
import { TimeoutModule } from 'ng2-timeout';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TimeoutModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

To use the module I recommend injecting the service into your top level app component.  
From there you can control what causes interrruptions to the timers and how you want to handle idle or timeout.

```typescript
import { IdleService } from '../ng2-timeout';

private idleState: string; // if you want to show the countdown for example

constructor( private idleService: IdleService ) {

  this.idleService.setTimeToIdle(60 * 10); // 10 minutes of no interrupts will set the user to idle
  this.idleService.setTimeToTimeout(60); // 1 minute of no timeout interrupts will set the user as timed out

  // subscribe to the idle observable
  this.idleService.watchIdle().subscribe((isIdle: boolean) => {
    if (isIdle) {
      //  do something if the user becomes idle
    }
  });

  this.idleService.watchTimeout().subscribe((countdown: string) => {
    this.idleState = countdown;
    if(+countdown <= 0){
      // do something about the timeout
    }
  });
}
```

Here is an example `@HostListener` for detecting keypress

```typescript
@HostListener('document:keypress', ['$event'])
handleKeyboardEvent(event: KeyboardEvent) {
  this.idleService.interruptIdle(); // interrupt the idle countdown and reset the timer if a key was pressed
  this.idleService.interruptTimeout(); // for illustration purposes we can also reset the timeout when a key is pressed

}
```



## Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run tsc
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Jack Jamieson](mailto:jack.jamieson@doh.nj.gov)
