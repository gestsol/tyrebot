import { Component } from '@angular/core';
import { TyreService, TempType, TyreState } from '../../../services/tyre.service';

@Component({
  selector: 'app-alerts',
  template: `<app-tyre-tabs [request]="getData" [tabs]="tabs" [columns]="columns"></app-tyre-tabs>`
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
    const parameters = [
      {
        state: TyreState.High,
        field: 'temperature'
      },
      {
        state: TyreState.High,
        field: 'pressure'
      },
      {
        state: TyreState.Low,
        field: 'pressure'
      },
      {
        state: TyreState.NoSignal
      }
    ]
    return this.tyre.getVehiclesHighTemp(parameters[index].state, parameters[index].field)
  }
  constructor (
    private tyre: TyreService
  ) {}

}
