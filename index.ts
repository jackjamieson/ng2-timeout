import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdleService } from './src/idle.service';

export * from './src/idle.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class TimeoutModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TimeoutModule,
      providers: [IdleService]
    };
  }
}
