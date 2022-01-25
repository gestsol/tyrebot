import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';

import { HeaderComponent } from '../../components/header/header.component';
import { MainComponent } from './main.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    MainComponent,
    HeaderComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
