import { Injectable } from '@angular/core';
import { BehaviorSubject, of, zip } from 'rxjs';
import { VehicleService } from 'src/app/services/vehicle.service';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

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
export class ActiveVehiclesService {

  private vehiclesSub = new BehaviorSubject<number>(0)

  vehicles$ = this.vehiclesSub.asObservable()

  constructor(
    private vehicleService: VehicleService,
    private http: HttpClient
  ) { }

  setVehicles(value: number) {
    this.vehiclesSub.next(value)
  }

  getVehicles(page?: number, page_size?: number, plate?: string) {
    return this.vehicleService.getVehicles(page, page_size, plate).pipe(
      map((response: any) => {
        const data: any = response.data.map((item) => ({
          id: item.id,
          axies: item.axies?.axies_count,
          chassis: item.chassis,
          internal_number: item.internal_number,
          plate: item.plate,
          hubName: item.hub_meta?.name
        }));
        this.setVehicles(data.length)
        return {data, total_entries: response.total_entries}
      })
    )
  }

  getSummary(id: number, from: string, to: string) {
    const defaultFrom = moment()
      .set('h', 0)
      .set('minutes', 0)
      .set('seconds', 0)
      .format('YYYY-MM-DDTHH:mm:ss')
    const defaultTo = moment().format('YYYY-MM-DDTHH:mm:ss')
    const queryParams = `?from=${from || defaultFrom}&to=${to || defaultTo}`
    return this.http.get<{data: Summary[]}>(`vehicles/${id}/summary_tpms_data${queryParams}`)
    .pipe(
      map((data) => data.data  as Summary[])
    )
  }

  getTpms(id: number) {
    return this.http.get(`vehicles/${id}/latest_tpms_data`)
    .pipe(
      map((data: any) => data.data)
    )
  }

  getBusData(id: number, dateFrom: string, dateTo: string) {
    return zip(
      this.vehicleService.getVehicle(id),
      this.getSummary(id, dateFrom, dateTo),
      this.getTpms(id)
    ).pipe(
      map(([vehicleData, summaryData, tpmsData]) => {
        let axies: any[] = [];
        if (vehicleData && tpmsData) {
          const { axies_count } = vehicleData.axies
          Object.keys(vehicleData.axies).forEach((key, axieIndex) => {
            if (!!vehicleData.axies[key] && vehicleData.axies[key].length && key !== 'axies_count') {
              const item = vehicleData.axies[key]
              let tyres = item.map((tyre: any, tyreIndex) => {
                const tpmsResult = tpmsData.find((tpms: any) => tpms.name === tyre.tpms_name)
                const summaryResult = summaryData.find((tpms: any) => tpms.name === tyre.tpms_name)
                let state = 'NO_SIGNAL'
                if (tpmsResult) {
                  const pressure = parseInt(tpmsResult.pressure);
                  if ( pressure > tyre.pressure + tyre.pressure*0.1) {
                    state = 'high'
                  } else if (pressure < tyre.pressure - tyre.pressure*0.2) {
                    state = 'low'
                  } else {
                    state = 'ok'
                  }
                }
                if (summaryResult) {
                  summaryResult.min_max_temp = `${summaryResult.min_temp.toFixed(0)} / ${summaryResult.max_temp.toFixed(0)} ºc`
                  summaryResult.min_max_pressure = `${summaryResult.min_pressure.toFixed(0)} / ${summaryResult.max_pressure.toFixed(0)} psi`
                  summaryResult.average_pressure = `${((summaryResult.min_temp + summaryResult.max_temp) / 2).toFixed(0)}`
                }
                return {
                  ...tyre,
                  ...(summaryResult || {}),
                  tyre_number: tyreIndex + 1,
                  state
                }
              })
              axies.push({
                tyres_count: tyres.length,
                type: axieIndex + 1 === axies_count? 'backup' : 'main',
                tyres,
                axie_number: axieIndex + 1
              })
            }
          })
        }
        vehicleData.axies = axies
        console.log(vehicleData.axies)
        return vehicleData
      })
    )
  }

  deleteVehicle(id: number) {
    return this.vehicleService.deleteVehicle(id)
  }
}
