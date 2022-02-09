import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-pressure-list',
  template: `<app-tyre-tabs [tabs]="tabs" [columns]="columns"></app-tyre-tabs>`
})
export class PressureListComponent {

  tabs = ['Optima', 'Alta', 'Baja'];
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

  constructor () {}

  ngOnDestroy(): void {
  }
}
