import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { VehiclesFlowService, FlowData, Step2, StepKeys } from '../vehicles-flow.service';

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
    private flowService: VehiclesFlowService
  ) {}

  get ejes() {
    return this.form.get('ejes') as FormArray;
  }

  ngOnInit(): void {
    this.flowService.data$.subscribe(
		  (value: FlowData) => {
        this.form = this.fb.group({
          ejes: this.fb.array([])
        });
        const ejes = value.step1?.ejes
        const actualData = value.step2?.ejes
        if (ejes) {
          this.cantidad =  ejes + 1;
          new Array(this.cantidad).fill(null).forEach((_, i) => {
            const control = new FormControl('', [
              Validators.required,
              ...(i === this.cantidad - 1 ?
                [Validators.max(3), Validators.min(1)] :
                [Validators.pattern('^2|4$')]
              )
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

  continue() {
    const step: Step2 = {
      ejes: this.ejes.controls.map(control => parseInt(control.value))
    }

    this.route.params.subscribe((params) => {
      this.flowService.updateStep(step, StepKeys.step2, !params['id'])
    })

    this.router.navigate(['../step-3'], {
      relativeTo: this.route
    })
  }
}
