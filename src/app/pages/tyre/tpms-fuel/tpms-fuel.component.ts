import { Component } from '@angular/core';
import { TyreService, TempType, TyreState } from '../../../services/tyre.service';

@Component({
  selector: 'app-tpms-fuel',
  template: `
    <app-back-button path="../../dashboard"></app-back-button>
    <app-tyre-tabs [request]="getData" [tabs]="tabs" [columns]="columns"></app-tyre-tabs>
  `
})
export class TpmsFuelComponent {
  tabs = ['TPMS Sin Señal', 'Alto consumo de combustible'];
  types = TempType;

  columns: {key: string, name: string}[] = [
    {
      key: 'plate',
      name: 'Patente'
    },
    {
      key: 'internal_number',
      name: 'Nº de Vehículo'
    },
    {
      key: 'axies',
      name: 'Ejes'
    },
    {
      key: 'hubName',
      name: 'Dispositivo GPS'
    },
    {
      key: 'fuelIndex',
      name: 'Indice de Combustible'
    },
    {
      key: 'action',
      name: 'Acciones'
    }
  ];

  getData = (index: number) => {
    if (index === 0) {
      return this.tyre.getVehiclesByState([TyreState.NoSignal])
    } else {
      return this.tyre.getTableLecture('with_excessive_fuel_consumption')
    }
  }

  constructor (
    private tyre: TyreService
  ) {}

}
