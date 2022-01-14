import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{path:'', redirectTo:'active-vehicle', pathMatch: 'full'},
	{path:'add-vehicle', loadChildren: () => import('./components/vehicles-flow/vehicles-flow.module').then( m => m.VehiclesFlowModule)},
	{path:'active-vehicle', loadChildren: () => import('./pages/active-vehicles/active-vehicles.module').then( m => m.ActiveVehiclesModule)},
	{path:'**', redirectTo:'', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
