import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAccountsRoutingModule } from './manage-accounts-routing.module';
import { ManageAccountsListComponent } from './manage-accounts-list/manage-accounts-list.component';
import { ManageAccountsDetailComponent, UpdateNotifier } from './manage-accounts-detail/manage-accounts-detail.component';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [
    ManageAccountsListComponent,
    ManageAccountsDetailComponent,
    UpdateNotifier
  ],
  imports: [
    CommonModule,
    ManageAccountsRoutingModule,
    SharedModule
  ]
})
export class ManageAccountsModule { }
