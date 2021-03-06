import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxEchartsModule } from 'ngx-echarts';

import { TyreRoutingModule } from './tyre-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared.module';
import { FiltersModule } from 'src/app/components/filters/filters.module';
import { PressureListComponent } from './pressure-list/pressure-list.component';
import { TyreContainerComponent } from './tyre-container/tyre-container.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ExpiredComponent } from './expired/expired.component';
import { AsymmetryPressureComponent } from './asymmetry-pressure/asymmetry-pressure.component';
import { TpmsFuelComponent } from './tpms-fuel/tpms-fuel.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PressureListComponent,
    TyreContainerComponent,
    AlertsComponent,
    ExpiredComponent,
    AsymmetryPressureComponent,
    TpmsFuelComponent
  ],
  imports: [
    CommonModule,
    TyreRoutingModule,
    SharedModule,
    FiltersModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ]
})
export class TyreModule { }
