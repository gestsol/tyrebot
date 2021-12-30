import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
 


@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  frmAddVehicle: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.frmAddVehicle = this.formBuilder.group({
		patente: ['', Validators.required],
		ejes: ['', Validators.required],
		chasis: ['', Validators.required],
		tpms: ['', Validators.required],
		nrointerno: ['', Validators.required],
		gps: ['', Validators.required]
	});
  }

  ngOnInit(): void {
  }


	get f() { return this.frmAddVehicle.controls; }
	
	
	continuar() {
        this.submitted = true;
 
        if (this.frmAddVehicle.invalid) {
            return;
        }
 
		
       this.router.navigate(['/ejes'], {
		   queryParams: {
			  cantidad: this.frmAddVehicle.get('ejes')?.value
		   }
		});
    }
}
