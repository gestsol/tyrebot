import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { zip } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { VehicleService } from 'src/app/services/vehicle.service';

export const PressureType = ["pressure_ok", "pressure_high", "pressure_low"];

export const TempType = ["temp_ok", "temp_high", "temp_low"];

export enum TyreState {
  High = 'high',
  Low = 'low',
  Ok = 'ok',
  NoSignal = 'NO_SIGNAL'
}

export interface TPMSData {
  batt: number
  created_at: string
  id: number
  name: string
  pressure: number
  temp: number
}

export interface Summary {
  from: string,
  max_pressure: number,
  max_temp: number,
  measurements_count: number,
  min_pressure: number,
  min_temp: number,
  name: string,
  to: string,
  min_max_temp?: string,
  min_max_pressure: string,
  average_pressure: string
}

@Injectable({
  providedIn: 'root'
})
export class TyreService {

  constructor(
    private http: HttpClient,
    private vehicleService: VehicleService
  ) { }

  getSummary(id: number, from: string, to: string) {
    const defaultFrom = moment()
      .set('h', 0)
      .set('minutes', 0)
      .set('seconds', 0)
      .format('YYYY-MM-DDTHH:mm:ss')
    const defaultTo = moment.utc().format('YYYY-MM-DDTHH:mm:ss')
    const queryParams = `?from=${from || defaultFrom}&to=${to || defaultTo}`
    return this.http.get<{data: Summary[]}>(`vehicles/${id}/summary_tpms_data${queryParams}`)
    .pipe(
      map((data) => data.data  as Summary[])
    )
  }

  getTpms(id: number) {
    return this.http.get<{data: TPMSData[]}>(`vehicles/${id}/latest_tpms_data`)
    .pipe(
      map((data) => data.data)
    )
  }

  getTableLecture(url: string) {
    return this.http.get<{data: any}>(`kpi/vehicles_${url}`).pipe(
      map((data: any) => {
        let response = data.data.map((item) => {
          return {
            id: item.id,
            chassis: item.chassis,
            internal_number: item.internal_number,
            plate: item.plate,
            hubName: item.hub_meta?.name,
            axies: this.vehicleService.getAxies(item.tyres).axies_count}
        })
        return {data: response, total_entries: response.length}
      })
    )
  }

  getVehiclesHighTemp(state: TyreState, field = 'pressure') {
    return this.vehicleService.getVehicles(0, 10000).pipe(
      mergeMap(async (response: any) => {
        const vehicles: any[] = []
        for (let vehicle of response.data) {
          const tpmsList = await this.getTpms(vehicle.id).toPromise()
          for (let tyre of vehicle.tyres) {
            const tpmsResult = tpmsList.find(item =>
              tyre.tpms_name === item.name
            )
            if (this.getTyreStatus(tpmsResult, tyre[field]) === state) {
              const vehicleRow = {
                id: vehicle.id,
                chassis: vehicle.chassis,
                internal_number: vehicle.internal_number,
                plate: vehicle.plate,
                hubName: vehicle.hub_meta?.name,
                axies: vehicle.axies?.axies_count
              }
              vehicles.push(vehicleRow)
              break
            }
          }
        }
        return {data: vehicles, total_entries: vehicles.length}
        // return {data, total_entries: response.total_entries}
      })
    )
  }

  getTyreStatus(tpmsResult: TPMSData | null | undefined, value) {
    if (tpmsResult) {
      if ( tpmsResult.pressure > value + value*0.1) {
        return TyreState.High
      } else if (tpmsResult.pressure < value - value*0.2) {
        return TyreState.Low
      } else {
        return TyreState.Ok
      }
    } else {
      return TyreState.NoSignal
    }
  }
}
