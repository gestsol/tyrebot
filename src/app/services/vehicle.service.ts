import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Tyre {
  tyres: number
  id?: number
  tpms_name: string
  tpms_meta: {
    tpms_type: string
    tpms_manufacturer: string
    tpms_installation_date: string
  }
  manufacture_date: string
  install_date: string
  temperature: number
  pressure: number
  tyre_brand_id: number
  providers: string
  dot: string
  index: string
  measurements: string
  recauchado: string
  wear: string
}

export interface Vehicle {
  plate: string
  chassis: string
  hubName: string
  nrointerno: string
  gps: string
  hubid?: number
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private subTyreBrands = new BehaviorSubject(null);
  tyreBrands$ = this.subTyreBrands.asObservable();

  private subTyreStatusList = new BehaviorSubject(null);
  tyreStatusList$ = this.subTyreStatusList.asObservable();

  constructor(
    private http: HttpClient
  ) {}

  getHubs() {
    return this.http.get('hub_tpms')
  }

  postHub(name: string) {
    const body = {name}
    return this.http.post('hub_tpms', {hub: body})
  }

  getVehicles(page = 1, page_size = 30, plate = '', paginate = true) {
    const params = new HttpParams()
    if (paginate) {
      params.set('page', page)
      params.set('page_size', page_size)
      params.set('plate', plate)
    }

    return this.http.get('vehicles', { params: {
      page, page_size, plate
    } })
    .pipe(map((data: any) => {
      let response = data.data.map((vehicle) => {
        return {...vehicle, axies: this.getAxies(vehicle.tyres)}
      })
      return {data: response, total_entries: data.total_entries}
    }))
  }

  getVehicle(id: number) {
    return this.http.get(`vehicles/${id}`)
    .pipe(map((data: any) => ({
      ...data.data,
      axies: this.getAxies(data.data.tyres)
    })))
  }

  getTyreBrands() {
    return this.http.get(`tyre_brands`)
    .pipe(
      map((data: any) => {
        this.subTyreBrands.next(data.data)
        return data.data
      })
    )
  }

  getTyreStatusList() {
    return this.http.get(`tyre_statuses`)
    .pipe(
      map((data: any) => {
        this.subTyreStatusList.next(data.data)
        return data.data
      })
    )
  }

  postVehicles(vehicle) {
    return this.http.post('vehicles', {vehicle})
  }

  putVehicles(id: number, vehicle) {
    return this.http.put(`vehicles/${id}`, {vehicle})
    .pipe(
      map((data: any) => data.data)
    )
  }

  postTyre(tyre) {
    return this.http.post(`tyres`, {tyre})
  }

  putTyre(id: number, tyre) {
    return this.http.put(`tyres/${id}`, {tyre})
  }

  getAxies(tyres: any[]) {
    let axie1: any[] = []
    let axie2: any[] = []
    let axie3: any[] = []
    let axie4: any[]  = []
    let axies_count = 0;
    tyres.forEach((tyre) => {
      const cases = {
        1: () => axie1.push(tyre),
        2: () => axie2.push(tyre),
        3: () => axie3.push(tyre),
        4: () => axie4.push(tyre)
      }
      cases[tyre.axie]()
      axies_count = Math.max(tyre.axie, axies_count)
    })

    return { axie1, axie2, axie3, axie4, axies_count }
  }

  deleteVehicle(id: number) {
    return this.http.delete(`vehicles/${id}`)
  }
}
