import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { finalize, mergeMap } from 'rxjs/operators';

export enum StepKeys {
  step1 = 'step1',
  step2 = 'step2',
  step3 = 'step3'
}

export interface EjeData {
  tires: number
  tpmsId: string[]
  tpmsType: string[]
  tpmsManufacturer: string[]
  tpmsDate: string[]
  tireDate: string[]
  tireBrand: string[]
  tireProvider: string[]
  dot: string[]
  loadIndex: string[]
  measurement: string[]
  reTire: string[]
  wear: string[]
}

export interface Step1 {
  patente: string
  ejes: string
  chasis: string
  hubId: string
  nrointerno: string
  gps: string
}

export interface Step2 {
  ejes: number[]
}

export interface Step3 {
  ejes: EjeData[]
}

export interface FlowData {
  step1: Step1 | null,
  step2: Step2 | null,
  step3: Step3 | null
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  data = new BehaviorSubject<FlowData>({
    step1: null,
    step2: null,
    step3: null
  })

  data$ = this.data.asObservable()

  constructor(
    private http: HttpClient
  ) {
    const step1 = this.getStepInfo(StepKeys.step1) as Step1
    const step2 = this.getStepInfo(StepKeys.step2) as Step2
    const step3 = this.getStepInfo(StepKeys.step3) as Step3
    const data = { step1, step2, step3 }
    this.data.next(data)
  }

  getStepInfo (key: string) {
    const data = localStorage.getItem(key)
    if (data != null && data !== '') {
      return JSON.parse(data)
    } else {
      return null
    }
  }

  updateStep(step: Partial<Step1 | Step2 | Step3>, key: StepKeys) {
    this.data.next({
      ...this.data.value,
      [key]: step
    })
    localStorage.setItem(key, JSON.stringify(step))
  }

  createData (step1: Step1, step3: Step3, finalizeCb = () => {}) {
    return this.createHub(step1.hubId)
    .pipe(
      mergeMap((data: any) => {
        return this.createVehicle(step1, step3, data.data.id)
      }),
      finalize(finalizeCb)
    )
  }

  createHub(name: string) {
    const body = {name}
    return this.http.post('hub_tpms', {hub: body})
  }

  getHubs() {
    return this.http.get('hub_tpms')
  }

  createVehicle(step1: Step1, step3: Step3, hub_tpms_id: number) {
    const body = {
      plate: step1.patente,
      internal_number: step1.nrointerno,
      chasis: step1.chasis,
      gps_model: step1.gps,
      hub_tpms_id: hub_tpms_id,
      format: {
        axies: step3.ejes.map((item, index) => ({
          type: index !== step3.ejes.length - 1 ? 'main' : 'backup',
          tyres_count: item.tires,
          axie_number: index + 1,
          tires: new Array(item.tires).fill({}).map((_, i) => ({
            tyre_number: i + 1,
            tpms_name: item.tpmsId[i],
            tpms_type: item.tpmsType[i],
            tpms_manufacturer: item.tpmsManufacturer[i],
            tpms_installation_date: item.tpmsDate[i],
            tyre_installation_date: item.tireDate[i],
            tyre_manufacturing_date: '',
            tyre_brand: item.tireBrand[i],
            tyre_provider: item.tireProvider[i],
            dot: item.dot[i],
            tyre_index: item.loadIndex[i],
            tyre_measurements: item.measurement[i],
            recauchado: item.reTire[i] && item.reTire[i] !== '',
            tyre_wear: item.wear
          }))
        })),
        axies_count: step3.ejes.length
      }
    }
    return this.http.post('vehicles', {vehicle: body})
  }
}
