import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
	{
    path: '',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainModule)
  },
	{
    path: 'login',
    component: LoginComponent
  },
	{
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
