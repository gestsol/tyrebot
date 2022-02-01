import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

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

  postVehicles(vehicle: any) {
    return this.http.post('vehicles', {vehicle})
  }

  putVehicles(id: number, vehicle) {
    return this.http.put(`vehicles/${id}`, {vehicle})
  }
}
