import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  title = 'tyrebot';
  navState: boolean = true;

  constructor(
    private navigation: NavigationService,
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    this.navigation.navOpen$.subscribe((value) => {
      this.navState = !value;
    })

    this.navigation.currentUrl$
    .subscribe(() => {
      window.scroll({
        left: 0,
        top: 0,
        behavior: 'smooth'
      })
    });

    this.vehicleService.getTyreBrands().subscribe()
    this.vehicleService.getTyreStatusList().subscribe()
  }

  close() {
    this.navigation.toggle()
  }

}
