import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { ActiveVehicleRoutingModule } from './active-vehicle-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [
    VehicleListComponent
  ],
  imports: [
    CommonModule,
    ActiveVehicleRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    SharedModule
  ]
})
export class ActiveVehiclesModule { }
