import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

	get f() { return this.form.controls; }

	continue() {
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }
    this.router.navigate(['../step-2'], {
      relativeTo: this.route,
		  queryParams: {
		   cantidad: this.form.get('ejes')?.value
		  }
		});
  }
}
