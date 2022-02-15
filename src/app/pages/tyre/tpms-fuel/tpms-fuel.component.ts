import { Component } from '@angular/core';
import { TyreService, TempType } from '../../../services/tyre.service';

@Component({
  selector: 'app-tpms-fuel',
  template: `<app-tyre-tabs [request]="getData" [tabs]="tabs" [columns]="columns"></app-tyre-tabs>`
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
      key: 'chassis',
      name: 'Alertas'
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
