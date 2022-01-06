import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { FlowData, Step1, Step2, StepKeys, VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-ejes',
  templateUrl: './ejes.component.html',
  styleUrls: ['./ejes.component.scss']
})
export class EjesComponent implements OnInit {
  cantidad = 0;
  form = this.fb.group({
    ejes: this.fb.array([])
  });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private vehicleService: VehicleService
  ) {}

  get ejes() {
    return this.form.get('ejes') as FormArray;
  }

  ngOnInit(): void {
    this.vehicleService.data$.subscribe(
		  (value: FlowData) => {
        console.log('value', value)
        const ejes = value.step1?.ejes
        const actualData = value.step2?.ejes
        if (ejes) {
          this.cantidad =  parseInt(ejes) + 1;
          new Array(this.cantidad).fill(null).forEach( () => {
            const control = new FormControl('', [
              Validators.required,
              Validators.max(4),
              Validators.min(1)
            ])
            this.ejes.push(control)
          });
        }

        if (actualData) {
          this.ejes.controls.forEach((control, i) => {
            control.setValue(actualData[i])
          })
        }
		  }
		)
  }

  back() {
	  this.router.navigate(['/add-vehicle'])
  }

  continue() {
    const data: Step2 = {
      ejes: this.ejes.controls.map(control => parseInt(control.value))
    }

    this.vehicleService.updateStep(data, StepKeys.step2)

    this.router.navigate(['../step-3'], {
      relativeTo: this.route
    })
  }

}
