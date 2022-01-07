import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { EjeData } from '../../../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-configuration-form',
  templateUrl: './vehicle-configuration-form.component.html',
  styleUrls: ['./vehicle-configuration-form.component.scss']
})
export class VehicleConfigurationFormComponent implements OnInit {
  @Input() eje: Partial<EjeData> | null = null

  headersLength: string[] = [];
  form: FormGroup | null = null;
  statusChanges = of('INVALID')

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createControls()
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

  private createControls() {
    this.headersLength = new Array((this.eje && this.eje.tires? this.eje.tires : 0) + 1).fill('')
    this.form = this.fb.group({
      tpmsId: this.fb.group({
        tires: this.fb.array([])
      }),
      tpmsType: this.fb.group({
        tires: this.fb.array([])
      }),
      tpmsManufacturer: this.fb.group({
        tires: this.fb.array([])
      }),
      tpmsDate: this.fb.group({
        tires: this.fb.array([])
      }),
      tireDate: this.fb.group({
        tires: this.fb.array([])
      }),
      tireBrand: this.fb.group({
        tires: this.fb.array([])
      }),
      tireProvider: this.fb.group({
        tires: this.fb.array([])
      }),
      dot: this.fb.group({
        tires: this.fb.array([])
      }),
      loadIndex: this.fb.group({
        tires: this.fb.array([])
      }),
      measurement: this.fb.group({
        tires: this.fb.array([])
      }),
      reTire: this.fb.group({
        tires: this.fb.array([])
      }),
      wear: this.fb.group({
        tires: this.fb.array([])
      })
    });

    console.log(this.eje)

    this.addControls(this.tpmsId, this.eje?.tpmsId, true);
    this.addControls(this.tpmsType, this.eje?.tpmsType);
    this.addControls(this.tpmsManufacturer, this.eje?.tpmsManufacturer);
    this.addControls(this.tpmsDate, this.eje?.tpmsDate);
    this.addControls(this.tireDate, this.eje?.tireDate);
    this.addControls(this.tireBrand, this.eje?.tireBrand);
    this.addControls(this.tireProvider, this.eje?.tireProvider);
    this.addControls(this.dot, this.eje?.dot);
    this.addControls(this.loadIndex, this.eje?.loadIndex);
    this.addControls(this.measurement, this.eje?.measurement);
    this.addControls(this.reTire, this.eje?.reTire);
    this.addControls(this.wear, this.eje?.wear);

    this.statusChanges = this.form.statusChanges.pipe(
      startWith(this.form.status)
    )
  }

  private addControls(controlList: FormArray, value: any[] = [], required = false) {
    new Array(this.eje?.tires).fill('').forEach((_, i) => {
      const control = new FormControl(value[i] || '', required ? [
        Validators.required
      ] : undefined)
      controlList.push(control)
    });
  }

  getData(): EjeData {
    return {
      tires: this.headersLength.length - 1,
      tpmsId: this.tpmsId.controls.map(control => control.value),
      tpmsType: this.tpmsType.controls.map(control => control.value),
      tpmsManufacturer: this.tpmsManufacturer.controls.map(control => control.value),
      tpmsDate: this.tpmsDate.controls.map(control => control.value),
      tireDate: this.tireDate.controls.map(control => control.value),
      tireBrand: this.tireBrand.controls.map(control => control.value),
      tireProvider: this.tireProvider.controls.map(control => control.value),
      dot: this.dot.controls.map(control => control.value),
      loadIndex: this.loadIndex.controls.map(control => control.value),
      measurement: this.measurement.controls.map(control => control.value),
      reTire: this.reTire.controls.map(control => control.value),
      wear: this.wear.controls.map(control => control.value)
    }
  }
}
