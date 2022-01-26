import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAccountsDetailComponent } from './manage-accounts-detail/manage-accounts-detail.component';
import { ManageAccountsListComponent } from './manage-accounts-list/manage-accounts-list.component';

const routes: Routes = [
  {
    path: '',
    component: ManageAccountsListComponent
  },
  {
    path: 'detail/:id',
    component: ManageAccountsDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAccountsRoutingModule { }
