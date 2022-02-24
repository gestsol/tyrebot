import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGuard } from './guards/main.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
	{
    path: '',
    canActivate: [MainGuard],
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainModule)
  },
	{
    path: 'join',
    loadChildren: () => import('./pages/session/session.module').then( m => m.SessionModule)
  },
	{
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
