
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleComponent } from './vehicle/vehicle.component';

const routes: Routes = [
  {
    component: VehicleListComponent,
    path: 'list'
  },
  {
    component: VehicleComponent,
    path: 'detail/:id'
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActiveVehicleRoutingModule { }
