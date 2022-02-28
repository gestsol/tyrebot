import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageCompaniesDetailComponent } from './manage-companies-detail/manage-companies-detail.component';
import { ManageCompaniesListComponent } from './manage-companies-list/manage-companies-list.component';

const routes: Routes = [
  {
    path: '',
    component: ManageCompaniesListComponent
  },
  {
    path: 'detail/:id',
    component: ManageCompaniesDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageCompaniesRoutingModule { }
