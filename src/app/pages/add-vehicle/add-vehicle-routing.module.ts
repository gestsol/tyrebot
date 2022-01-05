import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EjesComponent } from './ejes/ejes.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';

const routes: Routes = [
  {
    component: VehicleDetailComponent,
    path: ''
  },
  {
    component: EjesComponent,
    path: 'ejes'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddVehicleRoutingModule { }
