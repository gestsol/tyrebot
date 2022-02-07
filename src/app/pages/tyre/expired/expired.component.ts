import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableComponent } from 'src/app/components/table/table.component';
import { TyreTabsComponent } from 'src/app/components/tyre-tabs/tyre-tabs.component';
import { DashboardService } from '../dashboard.service';


@Component({
  selector: 'app-expired',
  templateUrl: './expired.component.html',
  styleUrls: ['./expired.component.scss']
})
export class ExpiredComponent {
  @ViewChild(TyreTabsComponent) tabGroup!: TyreTabsComponent
  @ViewChildren(TableComponent) tables!: QueryList<TableComponent>;

  tabs = ['Al día', 'Próximos a vencer', 'Vencidos'];
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

}
