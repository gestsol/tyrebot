import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { FooterComponent } from './components/footer/footer.component';
import { EjesComponent } from './components/ejes/ejes.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    MenuComponent,
    AddVehicleComponent,
    FooterComponent,
	EjesComponent
  ],
  imports: [
    BrowserModule,
	AppRoutingModule,
	FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
