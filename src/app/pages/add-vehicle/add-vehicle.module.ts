import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';

import { AddVehicleRoutingModule } from './add-vehicle-routing.module';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { EjesComponent } from './ejes/ejes.component';


@NgModule({
  declarations: [
    VehicleDetailComponent,
    EjesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AddVehicleRoutingModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatRippleModule
  ]
})
export class AddVehicleModule { }
