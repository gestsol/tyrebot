import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card'
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BusComponent } from './components/bus/bus.component'
import { AngularSvgIconModule } from 'angular-svg-icon'

import { httpInterceptorProviders } from './intereptors/base';

@NgModule({
  declarations: [
    BusComponent
  ],
  imports: [
    CommonModule,
    AngularSvgIconModule.forRoot()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatRippleModule,
    MatCardModule,
    MatTabsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatIconModule,
    MatProgressSpinnerModule,
    BusComponent
  ],
  providers: [
    httpInterceptorProviders,
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ]
})
export class SharedModule {}
