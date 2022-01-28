import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltersComponent } from './filters.component';
import { SearchComponent } from '../../components/filters/search/search.component';

import { FiltersService } from './filters.service';

import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [
    FiltersComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    FiltersComponent
  ],
  providers: [FiltersService]
})
export class FiltersModule { }
