import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AxieComponent } from './axie/axie.component';
import { ReplacementComponent } from './replacement/replacement.component';
import { BusComponent } from './bus.component';
import { AngularSvgIconModule } from 'angular-svg-icon'

@NgModule({
  declarations: [
    BusComponent,
    AxieComponent,
    ReplacementComponent
  ],
  imports: [
    CommonModule,
    AngularSvgIconModule.forRoot()
  ],
  exports: [
    BusComponent
  ]
})
export class BusModule { }
