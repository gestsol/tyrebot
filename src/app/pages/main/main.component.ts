import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { MainService } from './main.service';

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
    private mainService: MainService
  ) { }

  ngOnInit() {
    this.mainService.initData()
    this.mainService.navOpen$.subscribe((value) => {
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
  }

  close() {
    this.mainService.toggle()
  }

}
