import { Component, OnInit } from '@angular/core';
import { EjeData, Step1, Step2, VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  step1: Step1 | null = null
  step2: Step2 | null = null
  ejesLength = 0
  repuestoLength: string[] = []

  constructor(
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.vehicleService.data$.subscribe((value) => {
      console.log(value)
      const { step1, step2, step3 } = value
      if (step1 && step2?.ejes) {
        this.step1 = step1
        this.step2 = step2
        this.ejesLength = step2.ejes.length
        this.repuestoLength = new Array(step2.ejes[step2.ejes.length - 1]).fill('')
      }
    })
  }

  toEje(eje: number) {
    console.log(eje + 1)
  }

  continue() {
    console.log('continue')
  }

}
