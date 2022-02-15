import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './alerts/alerts.component';
import { AsymmetryPressureComponent } from './asymmetry-pressure/asymmetry-pressure.component';
import { PressureType, TempType } from '../../services/tyre.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpiredComponent } from './expired/expired.component';
import { PressureListComponent } from './pressure-list/pressure-list.component';
import { TpmsFuelComponent } from './tpms-fuel/tpms-fuel.component';
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
        path: 'alert-list/:tab',
        component: AlertsComponent
      },
      {
        path: 'expired-list/:tab',
        component: ExpiredComponent
      },
      {
        path: 'asymmetry-list/:tab',
        component: AsymmetryPressureComponent
      },
      {
        path: 'tpms-fuel-list/:tab',
        component: TpmsFuelComponent
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
