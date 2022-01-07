import { NgModule } from '@angular/core';
import { BackButtonComponent } from '../../components/back-button/back-button.component'

import { AddVehicleRoutingModule } from './add-vehicle-routing.module';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { EjesComponent } from './ejes/ejes.component';
import { VehicleConfigurationComponent } from './vehicle-configuration/vehicle-configuration.component';
import { VehicleConfigurationFormComponent } from './vehicle-configuration/vehicle-configuration-form/vehicle-configuration-form.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [
    BackButtonComponent,
    VehicleDetailComponent,
    EjesComponent,
    VehicleConfigurationComponent,
    VehicleConfigurationFormComponent,
    ConfirmationComponent
  ],
  imports: [
    AddVehicleRoutingModule,
    SharedModule
  ]
})
export class AddVehicleModule { }
