import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum StepKeys {
  step1 = 'step1',
  step2 = 'step2',
  step3 = 'step3'
}

export interface Step1 {
  patente: string
  ejes: string
  chasis: string
  tpms: string
  nrointerno: string
  gps: string
}

export interface Step2 {
  ejes: number[]
}

export interface Step3 {
  ejes: {
    tires: number
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
  }[]
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

  constructor() {
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

}
