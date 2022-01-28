import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { ActiveVehiclesService } from '../active-vehicles.service';

@Component({
  selector: 'app-active-vehicles-container',
  templateUrl: './active-vehicles-container.component.html',
  styleUrls: ['./active-vehicles-container.component.scss']
})
export class ActiveVehiclesContainerComponent implements OnInit {
  vehicles$ = this.activeVehicleService.vehicles$;
  showBackBtn = false;

  constructor(
    private navigationService: NavigationService,
    private activeVehicleService: ActiveVehiclesService
  ) { }

  ngOnInit(): void {
    this.navigationService.currentUrl$.subscribe((url) => {
      this.showBackBtn = url.includes('detail')
    })
  }

}
