import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getTyreBrands() {
    return this.http.get(`tyre_brands`)
    .pipe(
      map((data: any) => {
        this.subTyreBrands.next(data.data)
        return  data.data
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

  postVehicles(vehicle: any) {
    return this.http.post('vehicles', {vehicle})
  }

  putVehicles(id: number, vehicle) {
    return this.http.put(`vehicles/${id}`, {vehicle})
    .pipe(
      map((data: any) => {
        this.subTyreBrands.next(data.data)
        return  data.data
      })
    )
  }

  postTyre(tyre) {
    return this.http.post(`tyres`, {tyre})
  }
  putTyre(id: number, tyre) {
    return this.http.put(`tyres/${id}`, {tyre})
  }
}
