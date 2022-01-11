import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveVehiclesService {

  plateSub = new BehaviorSubject<string>('')
  dateSub = new BehaviorSubject<{from: string, to: string}>({from: '', to: ''})

  plate$ = this.plateSub.asObservable()
  date$ = this.dateSub.asObservable()

  constructor() { }

  setDate(data: {from: string, to: string}) {
    this.dateSub.next(data)
  }

  setPlate(value: string) {
    this.plateSub.next(value)
  }
}
