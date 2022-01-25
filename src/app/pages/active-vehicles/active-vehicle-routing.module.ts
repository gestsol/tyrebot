
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveVehiclesContainerComponent } from './active-vehicles-container/active-vehicles-container.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleComponent } from './vehicle/vehicle.component';

const routes: Routes = [
  {
    component: ActiveVehiclesContainerComponent,
    path: '',
    children: [
      {
        path: 'list',
        component: VehicleListComponent
      },
      {
        path: 'detail/:id',
        component: VehicleComponent
      },
      {
        path: '',
        redirectTo: 'list'
      }
    ],
  },
  {
    path: 'edit/:id',
    data: { edit: true },
    loadChildren: () => import('../../components/vehicles-flow/vehicles-flow.module').then( m => m.VehiclesFlowModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActiveVehicleRoutingModule { }
