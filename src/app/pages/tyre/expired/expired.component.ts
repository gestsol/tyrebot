import { Component } from '@angular/core';
import { TyreService, TempType } from '../../../services/tyre.service';

@Component({
  selector: 'app-expired',
  template: `<app-tyre-tabs [request]="getData" [tabs]="tabs" [columns]="columns"></app-tyre-tabs>`
})
export class ExpiredComponent {
  tabs = ['Al día', 'Próximos a vencer', 'Vencidos'];
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
      key: 'chassis',
      name: 'Chasis'
    },
    {
      key: 'action',
      name: 'Acciones'
    }
  ];

  getData = (index: number) =>
    this.tyre.getTableLecture(TempType[index])

  constructor (
    private tyre: TyreService
  ) {}

}
