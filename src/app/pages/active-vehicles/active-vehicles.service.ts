import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveVehiclesService {

  private plateSub = new BehaviorSubject<string>('')
  private dateSub = new BehaviorSubject<{from: string, to: string}>({from: '', to: ''})
  private vehiclesSub = new BehaviorSubject<number>(0)

  plate$ = this.plateSub.asObservable()
  date$ = this.dateSub.asObservable()
  vehicles$ = this.vehiclesSub.asObservable()

  constructor() { }

  setDate(data: {from: string, to: string}) {
    this.dateSub.next(data)
  }

  setPlate(value: string) {
    this.plateSub.next(value)
  }

  setVehicles(value: number) {
    this.vehiclesSub.next(value)
  }
}
