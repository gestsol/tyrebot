import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Step1, Step2, Step3, VehicleService } from '../../../services/vehicle.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  step1: Step1 | null = null
  step2: Step2 | null = null
  step3: Step3 | null = null
  ejesLength = 0
  loading = false

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.vehicleService.data$.subscribe((value) => {
      console.log(value)
      const { step1, step2, step3 } = value
      if (step1 && step2?.ejes) {
        this.step1 = step1
        this.step2 = step2
        this.step3 = step3
        this.ejesLength = step2.ejes.length
      }
    })
  }

  toDetail() {
    this.router.navigate(['../step-1'], {
      relativeTo: this.route
    })
  }

  toEjes() {
    this.router.navigate(['../step-2'], {
      relativeTo: this.route
    })
  }

  toEje(eje: number) {
    this.router.navigate(['../step-3'], {
      relativeTo: this.route,
		  queryParams: {
		   eje: eje
		  }
		});
  }

  test () {
    this.vehicleService.getHubs().subscribe()
  }

  continue() {
    if (this.step1 && this.step3) {
      this.loading = true;
      this.vehicleService.createData(this.step1, this.step3, () => this.loading = false)
      .subscribe((response) => {
        this.router.navigate(['../../active-vehicle'])
        console.log(response)
      }, (err) => console.error(err))
    }
  }

}
