import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card'

import { AddVehicleRoutingModule } from './add-vehicle-routing.module';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { EjesComponent } from './ejes/ejes.component';
import { VehicleConfigurationComponent } from './vehicle-configuration/vehicle-configuration.component';


@NgModule({
  declarations: [
    VehicleDetailComponent,
    EjesComponent,
    VehicleConfigurationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AddVehicleRoutingModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatRippleModule,
    MatCardModule
  ]
})
export class AddVehicleModule { }
