import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclesFlowService, FlowData, Step1, StepKeys } from '../vehicles-flow.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {
  hasId = false
  form = this.formBuilder.group({
    patente: ['', Validators.required],
    ejes: ['', Validators.required],
    chassis: ['', Validators.required],
    hubName: ['', Validators.required],
    nrointerno: ['', Validators.required],
    gps: ['', Validators.required]
  });

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private flowService: VehiclesFlowService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.flowService.data$.subscribe(
		  (value: FlowData) => {
        const actualData = value?.step1
        if (actualData) {
          this.form.get('patente')?.setValue(actualData.patente)
          this.form.get('ejes')?.setValue(actualData.ejes)
          this.form.get('chassis')?.setValue(actualData.chassis)
          this.form.get('hubName')?.setValue(actualData.hubName)
          this.form.get('nrointerno')?.setValue(actualData.nrointerno)
          this.form.get('gps')?.setValue(actualData.gps)
        }
      }
    )
    this.route.parent?.parent?.params.subscribe((params) => {
      this.hasId = !!params['id']
    })
  }

	get f() { return this.form.controls; }

	continue() {
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }

    const step: Step1 = {
      patente: this.form.get('patente')?.value,
      ejes: this.form.get('ejes')?.value,
      chassis: this.form.get('chassis')?.value,
      hubName: this.form.get('hubName')?.value,
      nrointerno: this.form.get('nrointerno')?.value,
      gps: this.form.get('gps')?.value
    }

    this.flowService.updateStep(step, StepKeys.step1, !this.hasId)

    this.router.navigate(['../step-2'], {
      relativeTo: this.route
		});
  }
}
