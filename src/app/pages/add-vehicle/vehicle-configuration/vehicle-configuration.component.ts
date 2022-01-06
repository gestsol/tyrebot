import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-configuration',
  templateUrl: './vehicle-configuration.component.html',
  styleUrls: ['./vehicle-configuration.component.scss']
})
export class VehicleConfigurationComponent implements OnInit {
  form = this.fb.group({
    tpmsId: this.fb.group({
      tires: this.fb.array(['', '', '', ''])
    }),
    tpmsType: this.fb.group({
      tires: this.fb.array(['', '', '', ''])
    }),
    tpmsManufacturer: this.fb.group({
      tires: this.fb.array(['', '', '', ''])
    }),
    tpmsDate: this.fb.group({
      tires: this.fb.array(['', '', '', ''])
    }),
    tireDate: this.fb.group({
      tires: this.fb.array(['', '', '', ''])
    }),
    tireBrand: this.fb.group({
      tires: this.fb.array(['', '', '', ''])
    }),
    tireProvider: this.fb.group({
      tires: this.fb.array(['', '', '', ''])
    }),
    dot: this.fb.group({
      tires: this.fb.array(['', '', '', ''])
    }),
    loadIndex: this.fb.group({
      tires: this.fb.array(['', '', '', ''])
    }),
    measurement: this.fb.group({
      tires: this.fb.array(['', '', '', ''])
    }),
    reTire: this.fb.group({
      tires: this.fb.array(['', '', '', ''])
    }),
    wear: this.fb.group({
      tires: this.fb.array(['', '', '', ''])
    })
  });

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get tpmsId() {
    return this.form.get('tpmsId')?.get('tires') as FormArray;
  }
  get tpmsType() {
    return this.form.get('tpmsType')?.get('tires') as FormArray;
  }
  get tpmsManufacturer() {
    return this.form.get('tpmsManufacturer')?.get('tires') as FormArray;
  }
  get tpmsDate() {
    return this.form.get('tpmsDate')?.get('tires') as FormArray;
  }
  get tireDate() {
    return this.form.get('tireDate')?.get('tires') as FormArray;
  }
  get tireBrand() {
    return this.form.get('tireBrand')?.get('tires') as FormArray;
  }
  get tireProvider() {
    return this.form.get('tireProvider')?.get('tires') as FormArray;
  }
  get dot() {
    return this.form.get('dot')?.get('tires') as FormArray;
  }
  get loadIndex() {
    return this.form.get('loadIndex')?.get('tires') as FormArray;
  }
  get measurement() {
    return this.form.get('measurement')?.get('tires') as FormArray;
  }
  get reTire() {
    return this.form.get('reTire')?.get('tires') as FormArray;
  }
  get wear() {
    return this.form.get('wear')?.get('tires') as FormArray;
  }

  back() {
	  this.router.navigate(['/add-vehicle/step-1'])
  }
}
