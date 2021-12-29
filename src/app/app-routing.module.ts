import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { MainComponent } from './components/main/main.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';

const routes: Routes = [
	{path:'', component: MainComponent},
	{path:'addVehicle', component: AddVehicleComponent},
	{path:'**',redirectTo:'', pathMatch: 'full'},
	
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
