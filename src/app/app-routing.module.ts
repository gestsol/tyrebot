import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { MainComponent } from './components/main/main.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { EjesComponent } from './components/ejes/ejes.component';

const routes: Routes = [
	{path:'', component: MainComponent},
	{path:'addVehicle', component: AddVehicleComponent},
	{path:'ejes', component: EjesComponent},
	{path:'**',redirectTo:'', pathMatch: 'full'},
	
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
