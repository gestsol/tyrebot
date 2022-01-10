import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  busData = {ejes: []}
  vehicleData: any
  axies: any
  tpmsData: any
  loading = false

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        const id = parseInt(params['id'])
        this.getData(id)
      }
    })
  }

  getData(id: number) {
    this.loading = true
    combineLatest([
      this.vehicleService.getVehicle(id),
      this.vehicleService.getTpms(id)
    ]).subscribe(([vehicleData, tpmsData]) => {
      this.vehicleData = vehicleData
      this.getBus(tpmsData)
      this.loading = false
    })
  }

  getBus (tpmsData: any) {
    if (this.vehicleData?.format && tpmsData) {
      console.log(tpmsData)
      console.log(this.vehicleData?.format)
      this.axies = this.vehicleData.format.axies.map((item: any) => {

        return item.tyres.map((tyre: any) => {
          const result = this.tpmsData.find((tpms: any) => tpms.name === tyre.tpms_name)
          let state = 'NO_SIGNAL'
          if (result) {
            if (result.pressure > 20) {
              state = 'HIGH'
            } else if (result.pressure < 10) {
              state = 'LOW'
            } else {
              state = 'OK'
            }
          }
          return {
            ...tyre,
            state
          }
        })
      })
    }
  }
}
