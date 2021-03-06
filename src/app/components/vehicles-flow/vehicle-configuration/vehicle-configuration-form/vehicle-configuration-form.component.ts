import { Component, Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { VehicleService } from 'src/app/services/vehicle.service';
import { AxieData } from '../../vehicles-flow.service';

@Component({
  selector: 'app-vehicle-configuration-form',
  templateUrl: './vehicle-configuration-form.component.html',
  styleUrls: ['./vehicle-configuration-form.component.scss']
})
export class VehicleConfigurationFormComponent implements OnInit {
  @Input() axie: Partial<AxieData> | null = null

  headersLength: string[] = [];
  form: FormGroup | null = null;
  statusChanges = of('INVALID')
  tpmsNameChanges = of([]);
  tyreStatusList$  = this.vehicleService.tyreStatusList$
  tyreBrands$  = this.vehicleService.tyreBrands$
  isMobile = false

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.createControls()
    this.isMobile = window.innerWidth < 790
  }

  @HostListener('window:resize', ['$event'])
  resize() {
    this.isMobile = window.innerWidth < 790
  }

  get tpms_name() {
    return this.form?.get('tpms_name')?.get('tires') as FormArray;
  }
  get tpms_type() {
    return this.form?.get('tpms_type')?.get('tires') as FormArray;
  }
  get tpms_manufacturer() {
    return this.form?.get('tpms_manufacturer')?.get('tires') as FormArray;
  }
  get manufacture_date() {
    return this.form?.get('manufacture_date')?.get('tires') as FormArray;
  }
  get uninstall_date() {
    return this.form?.get('uninstall_date')?.get('tires') as FormArray;
  }
  get tpms_installation_date() {
    return this.form?.get('tpms_installation_date')?.get('tires') as FormArray;
  }
  get tyre_installation_date() {
    return this.form?.get('tyre_installation_date')?.get('tires') as FormArray;
  }
  get tyre_temperature() {
    return this.form?.get('tyre_temperature')?.get('tires') as FormArray;
  }
  get tyre_pressure() {
    return this.form?.get('tyre_pressure')?.get('tires') as FormArray;
  }
  get tyre_brand_id() {
    return this.form?.get('tyre_brand_id')?.get('tires') as FormArray;
  }
  get tyre_provider() {
    return this.form?.get('tyre_provider')?.get('tires') as FormArray;
  }
  get dot() {
    return this.form?.get('dot')?.get('tires') as FormArray;
  }
  get tyre_index() {
    return this.form?.get('tyre_index')?.get('tires') as FormArray;
  }
  get tyre_measurements() {
    return this.form?.get('tyre_measurements')?.get('tires') as FormArray;
  }
  get recauchado() {
    return this.form?.get('recauchado')?.get('tires') as FormArray;
  }
  get tyre_wear() {
    return this.form?.get('tyre_wear')?.get('tires') as FormArray;
  }

  private createControls() {
    this.headersLength = new Array((this.axie && this.axie.tyres? this.axie.tyres : 0)).fill('')
    this.form = this.fb.group({
      tpms_name: this.fb.group({
        tires: this.fb.array([])
      }),
      tpms_type: this.fb.group({
        tires: this.fb.array([])
      }),
      tpms_manufacturer: this.fb.group({
        tires: this.fb.array([])
      }),
      manufacture_date: this.fb.group({
        tires: this.fb.array([])
      }),
      uninstall_date: this.fb.group({
        tires: this.fb.array([])
      }),
      tpms_installation_date: this.fb.group({
        tires: this.fb.array([])
      }),
      tyre_installation_date: this.fb.group({
        tires: this.fb.array([])
      }),
      tyre_temperature: this.fb.group({
        tires: this.fb.array([])
      }),
      tyre_pressure: this.fb.group({
        tires: this.fb.array([])
      }),
      tyre_brand_id: this.fb.group({
        tires: this.fb.array([])
      }),
      tyre_provider: this.fb.group({
        tires: this.fb.array([])
      }),
      dot: this.fb.group({
        tires: this.fb.array([])
      }),
      tyre_index: this.fb.group({
        tires: this.fb.array([])
      }),
      tyre_measurements: this.fb.group({
        tires: this.fb.array([])
      }),
      recauchado: this.fb.group({
        tires: this.fb.array([])
      }),
      tyre_wear: this.fb.group({
        tires: this.fb.array([])
      })
    });

    this.addControls(this.tpms_name, this.axie?.tpms_name, '', true);
    this.addControls(this.tpms_type, this.axie?.tpms_type);
    this.addControls(this.tpms_manufacturer, this.axie?.tpms_manufacturer);
    this.addControls(this.manufacture_date, this.axie?.manufacture_date, '', true);
    this.addControls(this.uninstall_date, this.axie?.uninstall_date, '', true);
    this.addControls(this.tpms_installation_date, this.axie?.tpms_installation_date);
    this.addControls(this.tyre_installation_date, this.axie?.tyre_installation_date);
    this.addControls(this.tyre_temperature, this.axie?.tyre_temperature, 20, true);
    this.addControls(this.tyre_pressure, this.axie?.tyre_pressure, 45, true);
    this.addControls(this.tyre_brand_id, this.axie?.tyre_brand_id, 1);
    this.addControls(this.tyre_provider, this.axie?.tyre_provider);
    this.addControls(this.dot, this.axie?.dot);
    this.addControls(this.tyre_index, this.axie?.tyre_index);
    this.addControls(this.tyre_measurements, this.axie?.tyre_measurements);
    this.addControls(this.recauchado, this.axie?.recauchado, 1);
    this.addControls(this.tyre_wear, this.axie?.tyre_wear);

    this.statusChanges = this.form.statusChanges.pipe(
      startWith(this.form.status)
    )
    this.tpmsNameChanges = this.tpms_name?.valueChanges.pipe(
      startWith(this.tpms_name?.value)
    )
  }

  private addControls(controlList: FormArray, value: any[] = [], defaultValue: any = '', required = false) {
    new Array(this.axie?.tyres).fill('').forEach((_, i) => {
      const control = new FormControl(value[i] || defaultValue, required ? [
        Validators.required
      ] : undefined)
      controlList.push(control)
    });
  }

  getData(): AxieData {
    const axies = {
      id: this.axie?.id,
      tyres: this.headersLength.length,
      tpms_name: this.tpms_name.controls.map(control => control.value),
      tpms_type: this.tpms_type.controls.map(control => control.value),
      tpms_manufacturer: this.tpms_manufacturer.controls.map(control => control.value),
      manufacture_date: this.manufacture_date.controls.map(control => control.value),
      uninstall_date: this.uninstall_date.controls.map(control => control.value),
      tpms_installation_date: this.tpms_installation_date.controls.map(control => control.value),
      tyre_installation_date: this.tyre_installation_date.controls.map(control => control.value),
      tyre_temperature: this.tyre_temperature.controls.map(control => control.value),
      tyre_pressure: this.tyre_pressure.controls.map(control => control.value),
      tyre_brand_id: this.tyre_brand_id.controls.map(control => parseInt(control.value)),
      tyre_provider: this.tyre_provider.controls.map(control => control.value),
      dot: this.dot.controls.map(control => control.value),
      tyre_index: this.tyre_index.controls.map(control => control.value),
      tyre_measurements: this.tyre_measurements.controls.map(control => control.value),
      recauchado: this.recauchado.controls.map(control => control.value),
      tyre_wear: this.tyre_wear.controls.map(control => control.value)
    }
    return axies
  }

  togglePanel(event, template, factor: number) {
    event.target.classList.toggle('expantion-btn--open')
    if (template.style.height) {
      template.style.paddingTop = ''
      template.style.paddingBottom = ''
      template.style.height = ''
    } else {
      template.style.paddingTop = '1.3rem'
      template.style.paddingBottom = '1.3rem'
      template.style.height = `${68 * factor}px`
    }
  }

  compareOptions(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }
}
