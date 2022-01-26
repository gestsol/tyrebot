import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { ActiveVehicleRoutingModule } from './active-vehicle-routing.module';

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
    SharedModule
  ]
})
export class ActiveVehiclesModule { }
