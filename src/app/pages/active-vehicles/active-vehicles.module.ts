import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleListComponent, DeleteVehicleDialog } from './vehicle-list/vehicle-list.component';
import { ActiveVehicleRoutingModule } from './active-vehicle-routing.module';

import { SharedModule } from 'src/app/shared.module';
import { VehicleComponent } from './vehicle/vehicle.component';
import { ActiveVehiclesContainerComponent } from './active-vehicles-container/active-vehicles-container.component';
import { FiltersModule } from 'src/app/components/filters/filters.module';


@NgModule({
  declarations: [
    VehicleListComponent,
    DeleteVehicleDialog,
    VehicleComponent,
    ActiveVehiclesContainerComponent
  ],
  imports: [
    CommonModule,
    ActiveVehicleRoutingModule,
    FiltersModule,
    SharedModule
  ]
})
export class ActiveVehiclesModule { }
