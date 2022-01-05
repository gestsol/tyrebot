import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
	{path:'', component: MainComponent},
	{path:'add-vehicle', loadChildren: () => import('./pages/add-vehicle/add-vehicle-routing.module').then( m => m.AddVehicleRoutingModule)},
	{path:'**',redirectTo:'', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
