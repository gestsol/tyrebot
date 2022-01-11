import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ActiveVehiclesService } from '../active-vehicles.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  busData: any;
  loading = false;
  dateFrom: string = '';
  dateTo: string = '';

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private activeVehicleService: ActiveVehiclesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        const id = parseInt(params['id'])
        this.getData(id)
      }
    })

    this.activeVehicleService.date$.subscribe(value => {
      this.dateFrom = value.from
      this.dateTo = value.to
    })
  }

  getData(id: number) {
    this.loading = true
    this.vehicleService.getBusData(id, this.dateFrom, this.dateTo).subscribe((data) => {
      this.busData = data
      this.loading = false
    })
  }
}
