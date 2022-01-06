import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card'
import { MatTabsModule } from '@angular/material/tabs';

import { AddVehicleRoutingModule } from './add-vehicle-routing.module';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { EjesComponent } from './ejes/ejes.component';
import { VehicleConfigurationComponent } from './vehicle-configuration/vehicle-configuration.component';
import { VehicleConfigurationFormComponent } from './vehicle-configuration/vehicle-configuration-form/vehicle-configuration-form.component';


@NgModule({
  declarations: [
    VehicleDetailComponent,
    EjesComponent,
    VehicleConfigurationComponent,
    VehicleConfigurationFormComponent
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
    MatTabsModule
  ]
})
export class AddVehicleModule { }
