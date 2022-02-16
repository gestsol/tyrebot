import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TyreService } from '../../../services/tyre.service';

@Component({
  selector: 'app-pressure-list',
  template: `
  <ng-container *ngIf="types?.length">
    <app-tyre-tabs [request]="getData" [tabs]="tabs" [columns]="columns"></app-tyre-tabs>
  </ng-container>
  `
})
export class PressureListComponent implements OnInit {
  types: string[] = [];

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
      name: 'Chasis'
    },
    {
      key: 'action',
      name: 'Acciones'
    }
  ];

  getData = (index: number) =>
    this.tyre.getTableLecture(this.types[index])

  constructor (
    private route: ActivatedRoute,
    private tyre: TyreService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.types = data.types
    })
  }

  ngOnDestroy(): void {
  }
}
