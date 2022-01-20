import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { ActiveVehicleRoutingModule } from './active-vehicle-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from 'src/app/shared.module';
import { VehicleComponent } from './vehicle/vehicle.component';
import { ActiveVehiclesContainerComponent } from './active-vehicles-container/active-vehicles-container.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    VehicleListComponent,
    VehicleComponent,
    ActiveVehiclesContainerComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    ActiveVehicleRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    SharedModule,
    MatButtonModule
  ]
})
export class ActiveVehiclesModule { }
