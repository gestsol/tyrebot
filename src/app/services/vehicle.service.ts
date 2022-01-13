import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, of, zip } from 'rxjs';
import { finalize, map, mergeMap } from 'rxjs/operators';

export enum StepKeys {
  step1 = 'step1',
  step2 = 'step2',
  step3 = 'step3'
}

export interface EjeData {
  tires: number
  tpms_name: string[]
  tpms_type: string[]
  tpms_manufacturer: string[]
  tpms_installation_date: string[]
  tyre_installation_date: string[]
  tyre_temperature: number[]
  tyre_pressure: number[]
  tyre_brand: string[]
  tyre_provider: string[]
  dot: string[]
  tyre_index: string[]
  tyre_measurements: string[]
  recauchado: string[]
  tyre_wear: string[]
}

export interface Step1 {
  patente: string
  ejes: string
  chassis: string
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

  getVehicles(page = 1, page_size = 30, plate = '') {
    const params = new HttpParams()
    params.set('page', page)
    params.set('page_size', page_size)
    params.set('plate', plate)

    return this.http.get('vehicles', { params: {
      page, page_size, plate
    } })
    .pipe(map((data: any) => data))
  }

  getVehicle(id: number) {
    return this.http.get(`vehicles/${id}`)
    .pipe(map((data: any) => data.data))
  }

  createVehicle(step1: Step1, step3: Step3, hub_tpms_id: number) {
    const body = {
      plate: step1.patente,
      internal_number: step1.nrointerno,
      chassis: step1.chassis,
      gps_model: step1.gps,
      hub_tpms_id: hub_tpms_id,
      format: {
        axies: step3.ejes.map((item, index) => ({
          type: index !== step3.ejes.length - 1 ? 'main' : 'backup',
          tyres_count: item.tires,
          axie_number: index + 1,
          tyres: new Array(item.tires).fill({}).map((_, i) => ({
            tyre_number: i + 1,
            tpms_name: item.tpms_name[i],
            tpms_type: item.tpms_type[i],
            tpms_manufacturer: item.tpms_manufacturer[i],
            tpms_installation_date: item.tpms_installation_date[i],
            tyre_installation_date: item.tyre_installation_date[i],
            tyre_manufacturing_date: '',
            tyre_temperature: item.tyre_temperature[i],
            tyre_pressure: item.tyre_pressure[i],
            tyre_brand: item.tyre_brand[i],
            tyre_provider: item.tyre_provider[i],
            dot: item.dot[i],
            tyre_index: item.tyre_index[i],
            tyre_tyre_measurementss: item.tyre_measurements[i],
            recauchado: item.recauchado[i],
            tyre_wear: item.tyre_wear[i]
          }))
        })),
        axies_count: step3.ejes.length
      }
    }
    return this.http.post('vehicles', {vehicle: body})
  }

  deleteInfo() {
    localStorage.removeItem(StepKeys.step1)
    localStorage.removeItem(StepKeys.step2)
    localStorage.removeItem(StepKeys.step3)
    this.data.next({
      step1: null,
      step2: null,
      step3: null
    })
  }
}
