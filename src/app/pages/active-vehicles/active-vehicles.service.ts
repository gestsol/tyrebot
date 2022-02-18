import { Injectable } from '@angular/core';
import { BehaviorSubject, zip } from 'rxjs';
import { VehicleService } from 'src/app/services/vehicle.service';
import { TyreState, TyreService, Summary, TPMSData } from '../../services/tyre.service';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActiveVehiclesService {

  private vehiclesSub = new BehaviorSubject<number>(0)

  vehicles$ = this.vehiclesSub.asObservable()

  constructor(
    private vehicleService: VehicleService,
    private tyreService: TyreService
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

  getBusData(id: number, dateFrom: string, dateTo: string) {
    return zip(
      this.vehicleService.getVehicle(id),
      this.tyreService.getSummary(id, dateFrom, dateTo),
      this.tyreService.getTpms(id)
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
                let state = this.tyreService.getTyreStatus(tpmsResult, tyre.pressure)

                if (summaryResult) {
                  summaryResult.min_max_temp = `${summaryResult.min_temp.toFixed(0)} / ${summaryResult.max_temp.toFixed(0)} ºc`
                  summaryResult.min_max_pressure = `${summaryResult.min_pressure.toFixed(0)} / ${summaryResult.max_pressure.toFixed(0)} psi`
                  summaryResult.average_pressure = `${((summaryResult.min_temp + summaryResult.max_temp) / 2).toFixed(0)} psi`
                }

                if(tyre.tpms_meta.tpms_installation_date?.length) {
                  tyre.tpms_meta.tpms_installation_date = moment(tyre.tpms_meta.tpms_installation_date).format('DD/MM/YYYY')
                }

                if(tyre.install_date?.length) {
                  tyre.install_date = moment(tyre.install_date).format('DD/MM/YYYY')
                }

                if(tyre.manufacture_date?.length) {
                  tyre.manufacture_date = moment(tyre.manufacture_date).format('DD/MM/YYYY')
                }
                return {
                  ...tyre,
                  ...(summaryResult || {}),
                  actual_pressure: tpmsResult ? `${tpmsResult.pressure.toFixed(0)} psi`: null,
                  actual_temp: tpmsResult ? `${tpmsResult.temp.toFixed(0)} ºc` : null,
                  tyre_number: tyreIndex + 1,
                  last_mesurement: tpmsResult ? moment(tpmsResult.created_at).format('DD/MM/YYYY') : 'N/A',
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
        return vehicleData
      })
    )
  }

  deleteVehicle(id: number) {
    return this.vehicleService.deleteVehicle(id)
  }
}
