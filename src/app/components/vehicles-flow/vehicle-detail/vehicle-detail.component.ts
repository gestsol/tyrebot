import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclesFlowService, FlowData, Step1, StepKeys, Step2 } from '../vehicles-flow.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {
  hasId = false
  form = this.fb.group({
    patente: ['', Validators.required],
    axies: this.fb.array([], Validators.minLength(2)),
    backup: [1, [Validators.required, Validators.max(3), Validators.min(1)]],
    chassis: ['', Validators.required],
    hubName: ['', Validators.required],
    nrointerno: ['', Validators.required],
    gps: ['', Validators.required]
  }, {
    updateOn: 'blur'
  });

  submitted = false;

  constructor(
    private fb: FormBuilder,
    private flowService: VehiclesFlowService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

	get f() { return this.form.controls; }

  get axies() { return this.form.get('axies') as FormArray; }

  ngOnInit(): void {
    this.flowService.data$.subscribe(
		  (value: FlowData) => {
        this.axies.clear()
        const {step1, step2} = value
        if (step1) {
          this.form.get('patente')?.setValue(step1.patente)
          this.form.get('chassis')?.setValue(step1.chassis)
          this.form.get('hubName')?.setValue(step1.hubName)
          this.form.get('nrointerno')?.setValue(step1.nrointerno)
          this.form.get('gps')?.setValue(step1.gps)
        }

        if (step2) {
          console.log(step2)
          step2.ejes.forEach((item, i) => {
            if (i !== step2.ejes.length - 1) {
              this.addAxie(item)
            } else {
              this.form.get('backup')?.setValue(item)
            }
          })
        }
      }
    )
    this.route.parent?.parent?.params.subscribe((params) => {
      this.hasId = !!params['id']
    })
  }

  addAxie(value = 2) {
    const control = new FormControl(value, [
      Validators.required,
      Validators.pattern('^2|4$')
    ]);
    this.axies.push(control);
  }

  removeAxie(index: number) {
    this.axies.removeAt(index);
  }

	continue() {
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }

    const step1: Step1 = {
      patente: this.form.get('patente')?.value,
      ejes: this.axies.length,
      chassis: this.form.get('chassis')?.value,
      hubName: this.form.get('hubName')?.value,
      nrointerno: this.form.get('nrointerno')?.value,
      gps: this.form.get('gps')?.value
    }

    const step2: Step2 = {
      ejes: [...this.axies.controls.map(control => parseInt(control.value)), this.form.get('backup')?.value]
    }

    this.flowService.updateStep(step1, StepKeys.step1, !this.hasId)
    this.flowService.updateStep(step2, StepKeys.step2, !this.hasId)

    this.router.navigate(['../step-2'], {
      relativeTo: this.route
		});
  }
}
