import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { EjesComponent } from './ejes/ejes.component';
import { VehicleConfigurationComponent } from './vehicle-configuration/vehicle-configuration.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';

const routes: Routes = [
  {
    component: VehicleDetailComponent,
    path: 'step-1'
  },
  {
    component: EjesComponent,
    path: 'step-2'
  },
  {
    component: VehicleConfigurationComponent,
    path: 'step-3'
  },
  {
    component: ConfirmationComponent,
    path: 'step-4'
  },
  {
    path: '**',
    redirectTo: 'step-1'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddVehicleRoutingModule { }
