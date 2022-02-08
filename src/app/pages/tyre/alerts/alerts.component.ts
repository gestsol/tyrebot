import { Component } from '@angular/core';

@Component({
  selector: 'app-alerts',
  template: `<app-tyre-tabs [tabs]="tabs" [columns]="columns"></app-tyre-tabs>`
})
export class AlertsComponent {

  tabs = ['Tº fuera de rango', 'Exceso de presión', 'Presión Baja', 'Sensor sin señal'];
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
      name: 'Alertas'
    },
    {
      key: 'action',
      name: 'Acciones'
    }
  ];

  constructor() {}

  ngAfterViewInit() {
  }
}
