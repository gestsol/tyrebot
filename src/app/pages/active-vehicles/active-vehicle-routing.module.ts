
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveVehiclesContainerComponent } from './active-vehicles-container/active-vehicles-container.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleComponent } from './vehicle/vehicle.component';

const routes: Routes = [
  {
    component: ActiveVehiclesContainerComponent,
    path: 'list',
    children: [
      {
        component: VehicleListComponent,
        path: ''
      },
      {
        component: VehicleComponent,
        path: 'detail/:id'
      }
    ]
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
