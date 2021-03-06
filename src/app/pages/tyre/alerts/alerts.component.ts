import { Component } from '@angular/core';
import { TyreService, TempType, TyreState } from '../../../services/tyre.service';

@Component({
  selector: 'app-alerts',
  template: `
    <app-back-button path="../../dashboard"></app-back-button>
    <app-tyre-tabs [request]="getData" [tabs]="tabs" [columns]="columns"></app-tyre-tabs>
  `
})
export class AlertsComponent {

  tabs = ['Alta temperatura', 'Exceso de presión', 'Presión Baja', 'Sensor sin señal'];

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
      key: 'chassis',
      name: 'Chassis'
    },
    {
      key: 'action',
      name: 'Acciones'
    }
  ];

  getData = (index: number) =>{
    const parameters: {states: TyreState[], field?: string}[] = [
      {
        states: [TyreState.High],
        field: 'temperature'
      },
      {
        states: [TyreState.High],
        field: 'pressure'
      },
      {
        states: [TyreState.Low],
        field: 'pressure'
      },
      {
        states: [TyreState.NoSignal48]
      }
    ]
    return this.tyre.getVehiclesByState(parameters[index].states, parameters[index].field)
  }
  constructor (
    private tyre: TyreService
  ) {}

}
