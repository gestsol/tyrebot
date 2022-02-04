import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PressureType, TempType } from './dashboard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PressureListComponent } from './pressure-list/pressure-list.component';
import { TyreContainerComponent } from './tyre-container/tyre-container.component';

const routes: Routes = [
  {
    path: '',
    component: TyreContainerComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'pressure-list',
        data: {
          types: PressureType
        },
        component: PressureListComponent
      },
      {
        path: 'temperature-list',
        data: {
          types: TempType
        },
        component: PressureListComponent
      },
      {
        path: '',
        redirectTo: 'dashboard'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TyreRoutingModule { }
