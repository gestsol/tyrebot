import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card'
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

import { AddVehicleRoutingModule } from './add-vehicle-routing.module';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { EjesComponent } from './ejes/ejes.component';
import { VehicleConfigurationComponent } from './vehicle-configuration/vehicle-configuration.component';
import { VehicleConfigurationFormComponent } from './vehicle-configuration/vehicle-configuration-form/vehicle-configuration-form.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';


@NgModule({
  declarations: [
    VehicleDetailComponent,
    EjesComponent,
    VehicleConfigurationComponent,
    VehicleConfigurationFormComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AddVehicleRoutingModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatRippleModule,
    MatCardModule,
    MatTabsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ]
})
export class AddVehicleModule { }
