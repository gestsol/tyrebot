import { Injectable } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import { BehaviorSubject } from 'rxjs';
import { finalize, map, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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
  ejes: number
  chassis: string
  hubName: string
  nrointerno: string
  gps: string
  hubid?: number
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

@Injectable()
export class VehiclesFlowService {

  data = new BehaviorSubject<FlowData>({
    step1: null,
    step2: null,
    step3: null
  })

  data$ = this.data.asObservable()
  constructor(
    private vehicleService: VehicleService
  ) { }

  loadData() {
    const step1 = this.getStepInfo(StepKeys.step1) as Step1
    const step2 = this.getStepInfo(StepKeys.step2) as Step2
    const step3 = this.getStepInfo(StepKeys.step3) as Step3
    const data = { step1, step2, step3 }
    this.data.next(data)
  }

  createVehicle(step1: Step1, step3: Step3, hub_tpms_id: number) {
    const body = this.generateBody(step1, step3, hub_tpms_id)
    return this.vehicleService.postVehicles(body)
  }

  prepareFlow (id: number) {
    this.data.next({
      step1: null,
      step2: null,
      step3: null
    });
    return this.vehicleService.getVehicle(id).pipe(
      map((data) => {
        const step1: Step1 = {
          patente: data.plate,
          nrointerno: data.internal_number,
          chassis: data.chassis,
          gps: data.gps_model,
          ejes: parseInt(data.format.axies_count) - 1,
          hubName: data.hub_tpms.name
        }

        const step2: Step2 = {
          ejes: data.format.axies.map(axie => axie.tyres_count)
        }

        const step3: Step3 = {
          ejes: data.format.axies.map(axie => {
            const getListField = (name: string) => axie.tyres.map((tyre) => tyre[name])
            return {
              tires: axie.tyres_count,
              tpms_name: getListField('tpms_name'),
              tpms_type: getListField('tpms_type'),
              tpms_manufacturer: getListField('tpms_manufacturer'),
              tpms_installation_date: getListField('tpms_installation_date'),
              tyre_installation_date: getListField('tyre_installation_date'),
              tyre_temperature: getListField('tyre_temperature'),
              tyre_pressure: getListField('tyre_pressure'),
              tyre_brand: getListField('tyre_brand'),
              tyre_provider: getListField('tyre_provider'),
              dot: getListField('dot'),
              tyre_index: getListField('tyre_index'),
              tyre_measurements: getListField('tyre_measurements'),
              recauchado: getListField('recauchado'),
              tyre_wear: getListField('tyre_wear')
            }
          })
        }
        this.updateStep(step1, StepKeys.step1, false)
        this.updateStep(step2, StepKeys.step2, false)
        this.updateStep(step3, StepKeys.step3, false)
      })
    )
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


  getStepInfo (key: string) {
    const data = localStorage.getItem(key)
    if (data != null && data !== '') {
      return JSON.parse(data)
    } else {
      return null
    }
  }

  updateStep(step: Partial<Step1 | Step2 | Step3>, key: StepKeys, save = true) {
    this.data.next({
      ...this.data.value,
      [key]: step
    })
    if (save) {
      localStorage.setItem(key, JSON.stringify(step))
    }
  }

  createData (step1: Step1, step3: Step3, finalizeCb = () => {}) {
    return this.vehicleService.postHub(step1.hubName)
    .pipe(
      mergeMap((data: any) => {
        return this.createVehicle(step1, step3, data.data.id)
      }),
      finalize(finalizeCb)
    )
  }

  updateData (id: number, step1: Step1, step3: Step3, finalizeCb = () => {}) {
    const body = this.generateBody(step1, step3, step1.hubid)
    return this.vehicleService.putVehicles(id, body)
    .pipe(
      finalize(finalizeCb)
    )
  }

  generateBody(step1: Step1, step3: Step3, hub_tpms_id?: number) {
    return {
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
  }
}
