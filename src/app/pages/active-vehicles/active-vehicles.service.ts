import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VehicleService } from 'src/app/services/vehicle.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActiveVehiclesService {

  private plateSub = new BehaviorSubject<string>('')
  private dateSub = new BehaviorSubject<{from: string, to: string}>({from: '', to: ''})
  private vehiclesSub = new BehaviorSubject<any[]>([])

  plate$ = this.plateSub.asObservable()
  date$ = this.dateSub.asObservable()
  vehicles$ = this.vehiclesSub.asObservable()

  constructor(
    private vehicleService: VehicleService
  ) { }

  setDate(data: {from: string, to: string}) {
    this.dateSub.next(data)
  }

  setPlate(value: string) {
    this.plateSub.next(value)
  }

  setVehicles(value: any[]) {
    this.vehiclesSub.next(value)
  }

  getVehicles() {
    return this.vehicleService.getVehicles().pipe(
      map((response: any) => {
        const data: any = response.map((item) => ({
          id: item.id,
          axies: item.format?.axies_count,
          chassis: item.chassis,
          internal_number: item.internal_number,
          plate: item.plate,
          hubId: item.hub_tpms.name
        }));
        this.setVehicles(data)
      })
    )
  }
}
