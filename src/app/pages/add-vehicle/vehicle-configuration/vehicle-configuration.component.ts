import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-configuration',
  templateUrl: './vehicle-configuration.component.html',
  styleUrls: ['./vehicle-configuration.component.scss']
})
export class VehicleConfigurationComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  back() {
	  this.router.navigate(['/add-vehicle/step-1'])
  }
}
