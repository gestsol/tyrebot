import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-vehicle-configuration-form',
  templateUrl: './vehicle-configuration-form.component.html',
  styleUrls: ['./vehicle-configuration-form.component.scss']
})
export class VehicleConfigurationFormComponent implements OnInit {
  @Input() tires = 0

  tiresLength: string[] = []
  form: FormGroup | null = null

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log('tires', this.tires)
    this.tiresLength = new Array(this.tires + 1).fill('')
    this.form = this.fb.group({
      tpmsId: this.fb.group({
        tires: this.fb.array(new Array(this.tires).fill(''))
      }),
      tpmsType: this.fb.group({
        tires: this.fb.array(new Array(this.tires).fill(''))
      }),
      tpmsManufacturer: this.fb.group({
        tires: this.fb.array(new Array(this.tires).fill(''))
      }),
      tpmsDate: this.fb.group({
        tires: this.fb.array(new Array(this.tires).fill(''))
      }),
      tireDate: this.fb.group({
        tires: this.fb.array(new Array(this.tires).fill(''))
      }),
      tireBrand: this.fb.group({
        tires: this.fb.array(new Array(this.tires).fill(''))
      }),
      tireProvider: this.fb.group({
        tires: this.fb.array(new Array(this.tires).fill(''))
      }),
      dot: this.fb.group({
        tires: this.fb.array(new Array(this.tires).fill(''))
      }),
      loadIndex: this.fb.group({
        tires: this.fb.array(new Array(this.tires).fill(''))
      }),
      measurement: this.fb.group({
        tires: this.fb.array(new Array(this.tires).fill(''))
      }),
      reTire: this.fb.group({
        tires: this.fb.array(new Array(this.tires).fill(''))
      }),
      wear: this.fb.group({
        tires: this.fb.array(new Array(this.tires).fill(''))
      })
    });
  }

  get tpmsId() {
    return this.form?.get('tpmsId')?.get('tires') as FormArray;
  }
  get tpmsType() {
    return this.form?.get('tpmsType')?.get('tires') as FormArray;
  }
  get tpmsManufacturer() {
    return this.form?.get('tpmsManufacturer')?.get('tires') as FormArray;
  }
  get tpmsDate() {
    return this.form?.get('tpmsDate')?.get('tires') as FormArray;
  }
  get tireDate() {
    return this.form?.get('tireDate')?.get('tires') as FormArray;
  }
  get tireBrand() {
    return this.form?.get('tireBrand')?.get('tires') as FormArray;
  }
  get tireProvider() {
    return this.form?.get('tireProvider')?.get('tires') as FormArray;
  }
  get dot() {
    return this.form?.get('dot')?.get('tires') as FormArray;
  }
  get loadIndex() {
    return this.form?.get('loadIndex')?.get('tires') as FormArray;
  }
  get measurement() {
    return this.form?.get('measurement')?.get('tires') as FormArray;
  }
  get reTire() {
    return this.form?.get('reTire')?.get('tires') as FormArray;
  }
  get wear() {
    return this.form?.get('wear')?.get('tires') as FormArray;
  }

}
