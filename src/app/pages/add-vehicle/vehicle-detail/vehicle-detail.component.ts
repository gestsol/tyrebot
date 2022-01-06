import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlowData, Step1, StepKeys, VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {
  form = this.formBuilder.group({
    patente: ['', Validators.required],
    ejes: ['', Validators.required],
    chasis: ['', Validators.required],
    tpms: ['', Validators.required],
    nrointerno: ['', Validators.required],
    gps: ['', Validators.required]
  });

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private vehicleService: VehicleService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.vehicleService.data$.subscribe(
		  (value: FlowData) => {
        const actualData = value?.step1
        if (actualData) {
          this.form.get('patente')?.setValue(actualData.patente)
          this.form.get('ejes')?.setValue(actualData.ejes)
          this.form.get('chasis')?.setValue(actualData.chasis)
          this.form.get('tpms')?.setValue(actualData.tpms)
          this.form.get('nrointerno')?.setValue(actualData.nrointerno)
          this.form.get('gps')?.setValue(actualData.gps)
        }
      }
    )
  }

	get f() { return this.form.controls; }

	continue() {
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }

    const data: Step1 = {
      patente: this.form.get('patente')?.value,
      ejes: this.form.get('ejes')?.value,
      chasis: this.form.get('chasis')?.value,
      tpms: this.form.get('tpms')?.value,
      nrointerno: this.form.get('nrointerno')?.value,
      gps: this.form.get('gps')?.value
    }

    this.vehicleService.updateStep(data, StepKeys.step1)

    this.router.navigate(['../step-2'], {
      relativeTo: this.route
		});
  }
}
