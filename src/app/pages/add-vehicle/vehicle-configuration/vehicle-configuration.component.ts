import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlowData, VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-configuration',
  templateUrl: './vehicle-configuration.component.html',
  styleUrls: ['./vehicle-configuration.component.scss']
})
export class VehicleConfigurationComponent implements OnInit {

  ejes: number[] = []

  constructor(
    private router: Router,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.vehicleService.data$.subscribe((value: FlowData) => {
      const step2 = value?.step2
      if (step2) {
        this.ejes = step2.ejes
      }
    })
  }

  back() {
	  this.router.navigate(['/add-vehicle/step-2'])
  }
}
