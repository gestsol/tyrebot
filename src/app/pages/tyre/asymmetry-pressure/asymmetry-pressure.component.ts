import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asymmetry-pressure',
  template: `<app-tyre-tabs [tabs]="tabs" [columns]="columns"></app-tyre-tabs>`
})
export class AsymmetryPressureComponent {
  tabs = ['Asimetría de Tº en el mismo eje', 'Asimetría de presión en el mismo eje'];

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

  constructor() { }

}
