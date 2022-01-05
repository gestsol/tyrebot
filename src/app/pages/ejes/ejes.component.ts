import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

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
    private fb: FormBuilder
  ) {
		this.route.queryParams.subscribe(
		  params => {
			  this.cantidad =  parseInt(params['cantidad']) + 1;
        console.log(new Array(this.cantidad).fill(null), this.cantidad)
        new Array(this.cantidad).fill(null).forEach( () => {
          const control = new FormControl('', [
            Validators.required,
            Validators.max(4),
            Validators.min(1)
          ])
          this.ejes.push(control)
        });
		  }
		)
  }

  get ejes() {
    return this.form.get('ejes') as FormArray;
  }

  ngOnInit(): void {
  }

  volver() {
	 this.router.navigate(['/addVehicle'])
  }

  continuar() {
    console.log('continuar')
  }

}
