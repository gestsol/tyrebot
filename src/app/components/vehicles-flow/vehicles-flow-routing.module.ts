import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { EjesComponent } from './ejes/ejes.component';
import { VehicleConfigurationComponent } from './vehicle-configuration/vehicle-configuration.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { VehiclesFlowComponent } from './vehicles-flow.component';

const routes: Routes = [
  {
    path: '',
    component: VehiclesFlowComponent,
    children: [
      {
        component: VehicleDetailComponent,
        path: 'step-1'
      },
      // {
      //   component: EjesComponent,
      //   path: 'step-2'
      // },
      {
        component: VehicleConfigurationComponent,
        path: 'step-2'
      },
      {
        component: ConfirmationComponent,
        path: 'step-3'
      },
      {
        path: '',
        redirectTo: 'step-1'
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesFlowRoutingModule { }
