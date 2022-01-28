import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VehicleService } from 'src/app/services/vehicle.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class FiltersService {

  private plateSub = new BehaviorSubject<string>('')
  private dateSub = new BehaviorSubject<{from: string, to: string}>({from: '', to: ''})
  private vehiclesSub = new BehaviorSubject<any[]>([])

  plate$ = this.plateSub.asObservable()
  date$ = this.dateSub.asObservable()
  vehicles$ = this.vehiclesSub.asObservable()

  constructor(
    private vehicleService: VehicleService,
    private http: HttpClient
  ) { }

  setDate(data: {from: string, to: string}) {
    this.dateSub.next(data)
  }

  setPlate(value: string) {
    this.plateSub.next(value)
  }

  getDate() {
    return this.dateSub.value
  }

  getPlate() {
    return this.plateSub.value
  }

  setVehicles(value: any[]) {
    this.vehiclesSub.next(value)
  }
}
