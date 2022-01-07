import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { ActiveVehicleRoutingModule } from './active-vehicle-routing.module';



@NgModule({
  declarations: [
    VehicleListComponent
  ],
  imports: [
    CommonModule,
    ActiveVehicleRoutingModule
  ]
})
export class ActiveVehiclesModule { }
