import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { NavigationService } from 'src/app/services/navigation.service';
import { ActiveVehiclesService } from '../active-vehicles.service';
import { FiltersService } from 'src/app/components/filters/filters.service';

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
    private activeVehicleService: ActiveVehiclesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.navigationService.currentUrl$.subscribe((url) => {
      this.showBackBtn = url.includes('detail')
    })
  }

}
