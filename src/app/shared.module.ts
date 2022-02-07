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
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { httpInterceptorProviders } from './intereptors/base';
import { BusModule } from './components/bus/bus.module';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { VehicleCreationSuccessComponent } from './components/vehicle-creation-success/vehicle-creation-success.component';
import { TableComponent } from './components/table/table.component';
import { BtnXlsxComponent } from './components/btn-xlsx/btn-xlsx.component';

@NgModule({
  declarations: [
    BackButtonComponent,
    VehicleCreationSuccessComponent,
    TableComponent,
    BtnXlsxComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatMenuModule
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
    BusModule,
    BackButtonComponent,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    TableComponent,
    MatMenuModule,
    BtnXlsxComponent
  ],
  providers: [
    httpInterceptorProviders,
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ]
})
export class SharedModule {}
