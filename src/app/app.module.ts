import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { AddVehicleComponent } from './pages/add-vehicle/add-vehicle.component';
import { FooterComponent } from './components/footer/footer.component';
import { EjesComponent } from './pages/ejes/ejes.component';
import { SelectComponent } from './components/select/select.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    MenuComponent,
    AddVehicleComponent,
    FooterComponent,
	  EjesComponent,
    SelectComponent
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
