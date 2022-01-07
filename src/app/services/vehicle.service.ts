import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

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

  createData (step1: Step1, step3: Step3) {
    return this.createHub(step1.hubId)
    .pipe(
      mergeMap((data: any) => {
        return this.createVehicle(step1, step3, data.hub_tpms_id)
      })
    )
  }
  createHub(name: string) {
    return this.http.post('', name)
  }
  createVehicle(step1: Step1, step3: Step3, hub_tpms_id: number) {
    const body = {
      plate: step1.patente,
      internal_number: step1.nrointerno,
      chasis: step1.chasis,
      gps_model: step1.gps,
      hub_tpms_id: hub_tpms_id,
      formats: {
        axies: step3.ejes.map((item, index) => ({
          type: "backup",
          tyres_count: item.tires,
          axie_number: index + 1,
          tires: new Array(item.tires)
        })),
        axies_count: step3.ejes.length
      }
    }
    return this.http.post('', body)
  }



}
