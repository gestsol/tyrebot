import { Injectable } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import { BehaviorSubject, Observable, zip } from 'rxjs';
import { finalize, map, mergeMap } from 'rxjs/operators';

export enum StepKeys {
  step1 = 'step1',
  step2 = 'step2',
  step3 = 'step3'
}

export interface AxieData {
  tyres: number
  id?: number[]
  tpms_name: string[]
  tpms_type: string[]
  tpms_manufacturer: string[]
  manufacture_date: string[]
  uninstall_date: string[]
  tpms_installation_date: string[]
  tyre_installation_date: string[]
  tyre_temperature: number[]
  tyre_pressure: number[]
  tyre_brand_id: number[]
  tyre_provider: string[]
  dot: string[]
  tyre_index: string[]
  tyre_measurements: string[]
  recauchado: string[]
  tyre_wear: string[]
}

export interface Step1 {
  patente: string
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
  ejes: AxieData[]
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

  createVehicle(step1: Step1, step3: Step3) {
    const body = {
      ...this.generateVehicle(step1),
      tyres: this.generateTyre(step3)
    }
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
        const { axies } = data
        const step1: Step1 = {
          patente: data.plate,
          nrointerno: data.internal_number,
          chassis: data.chassis,
          gps: data.gps_model,
          hubName: data.hub_meta?.name
        }

        const step2: Step2 = {
          ejes: [axies.axie1.length, axies.axie2.length, axies.axie3.length]
        }

        if (axies.axie4.length) {
          step2.ejes.push(axies.axie4.length)
        } else {
          delete axies.axie4
        }

        delete axies.axies_count

        const axiesArr = Object.keys(axies).map(key => axies[key])
        const step3: Step3 = {
          ejes: axiesArr.map(axie => {
            return {
              tyres: axie.length,
              id: axie.map((tyre) => tyre.id),
              tpms_name: axie.map((tyre) => tyre.tpms_name),
              tpms_type: axie.map((tyre) => tyre.tpms_meta.tpms_type),
              tpms_manufacturer: axie.map((tyre) => tyre.tpms_meta.tpms_manufacturer),
              manufacture_date: axie.map((tyre) => tyre.manufacture_date),
              uninstall_date: axie.map((tyre) => tyre.uninstall_date),
              tpms_installation_date: axie.map((tyre) => tyre.tpms_meta.tpms_installation_date),
              tyre_installation_date: axie.map((tyre) => tyre.install_date),
              tyre_temperature: axie.map((tyre) => tyre.temperature),
              tyre_pressure: axie.map((tyre) => tyre.pressure),
              tyre_brand_id: axie.map((tyre) => tyre.tyre_brand_id),
              tyre_provider: axie.map((tyre) => tyre.providers),
              dot: axie.map((tyre) => tyre.dot),
              tyre_index: axie.map((tyre) => tyre.index),
              tyre_measurements: axie.map((tyre) => tyre.measurements),
              recauchado: axie.map((tyre) => tyre.tyre_status_id),
              tyre_wear: axie.map((tyre) => tyre.tyre_wear),
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
    return this.createVehicle(step1, step3)
      .pipe(
        finalize(finalizeCb)
      )
  }

  updateData (id: number, step1: Step1, step3: Step3, finalizeCb = () => {}) {
    const vehicle = this.generateVehicle(step1)
    return this.vehicleService.putVehicles(id, vehicle)
    .pipe(
      mergeMap((vehicle: any) => {
        const tyres = this.generateTyre(step3)
        const updateBatch: Observable<any>[] = []
        const createBatch: Observable<any>[] = []
        tyres.forEach(tyre => {
          if (tyre.id)
            updateBatch.push(this.vehicleService.putTyre(tyre.id, tyre))
          else
            createBatch.push(this.vehicleService.postTyre({...tyre, vehicle_id: vehicle.id}))
        })

        return zip(...updateBatch, ...createBatch)
      }),
      finalize(finalizeCb)
    )
  }

  generateVehicle(step1: Step1) {
    return {
      plate: step1.patente,
      internal_number: step1.nrointerno,
      chassis: step1.chassis,
      gps_model: step1.gps,
      hub_meta: {
        name: step1.hubName
      }
    }
  }

  generateTyre(step3: Step3) {
    let tyres: any[] = []
    step3.ejes.forEach((item, axieIndex) => {
      const result = new Array(item.tyres).fill({}).map((_, i) => {
        const tyre: any = {
          axie: axieIndex + 1,
          number: i + 1,
          tpms_meta: {
            tpms_type: item.tpms_type[i],
            tpms_manufacturer: item.tpms_manufacturer[i],
            tpms_installation_date: item.tpms_installation_date[i],
          },
          install_date: item.tyre_installation_date[i],
          manufacture_date: item.manufacture_date[i],
          uninstall_date: item.uninstall_date[i],
          temperature: item.tyre_temperature[i],
          pressure: typeof item.tyre_pressure[i] === 'string'? parseInt(item.tyre_pressure[i] as any):item.tyre_pressure[i],
          tyre_brand_id: item.tyre_brand_id[i],
          providers: item.tyre_provider[i],
          dot: item.dot[i],
          index: item.tyre_index[i],
          measurements: item.tyre_measurements[i],
          tyre_status_id: item.recauchado[i],
          wear: item.tyre_wear[i],
          tpms_name: item.tpms_name[i],
        }
        if (item.id?.length) {
          tyre.id = item.id[i]
        }

        return tyre
      })
      tyres = tyres.concat(result)
    })

    return tyres;
  }
}
