import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageCompaniesRoutingModule } from './manage-companies-routing.module';
import { ManageCompaniesListComponent } from './manage-companies-list/manage-companies-list.component';
import { ManageCompaniesDetailComponent } from './manage-companies-detail/manage-companies-detail.component';
import { SharedModule } from 'src/app/shared.module';


@NgModule({
  declarations: [
    ManageCompaniesListComponent,
    ManageCompaniesDetailComponent
  ],
  imports: [
    CommonModule,
    ManageCompaniesRoutingModule,
    SharedModule
  ]
})
export class ManageCompaniesModule { }
