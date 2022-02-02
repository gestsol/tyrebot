import { NgModule } from '@angular/core';
import { VehiclesFlowRoutingModule } from './vehicles-flow-routing.module';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
// import { EjesComponent } from './ejes/ejes.component';
import { VehicleConfigurationComponent } from './vehicle-configuration/vehicle-configuration.component';
import { VehicleConfigurationFormComponent } from './vehicle-configuration/vehicle-configuration-form/vehicle-configuration-form.component';
import { SharedModule } from 'src/app/shared.module';
import { VehiclesFlowComponent } from './vehicles-flow.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { VehiclesFlowService } from './vehicles-flow.service';


@NgModule({
  declarations: [
    VehicleDetailComponent,
    // EjesComponent,
    VehicleConfigurationComponent,
    VehicleConfigurationFormComponent,
    ConfirmationComponent,
    VehiclesFlowComponent
  ],
  imports: [
    VehiclesFlowRoutingModule,
    SharedModule
  ],
  providers: [
    VehiclesFlowService
  ]
})
export class VehiclesFlowModule { }
