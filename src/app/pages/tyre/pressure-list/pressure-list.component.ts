import { Component, AfterViewInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { TableComponent } from 'src/app/components/table/table.component';
import { DashboardService, TableType } from '../dashboard.service';

@Component({
  selector: 'app-pressure-list',
  templateUrl: './pressure-list.component.html',
  styleUrls: ['./pressure-list.component.scss']
})
export class PressureListComponent implements AfterViewInit {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup
  @ViewChildren(TableComponent) tables!: QueryList<TableComponent>;

  tabs = ['Optima', 'Alta', 'Baja'];
  types: {[key: number]: TableType} = {}
  tableSub: Subscription | null = null
  loading = false;
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

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnDestroy(): void {
    this.tableSub?.unsubscribe()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.route.data.subscribe(data => {
        this.types = data.types;
        console.log(this.tables)
        this.getData();
      })
    }, 0)
  }

  getData() {
    this.loading = true;
    this.tabGroup.selectedTabChange.pipe(
      startWith({index: 0}),
      switchMap((event) => {
        return this.dashboardService.getTableLecture(this.types[event.index]).pipe(
          map(data => ({data, index: event.index}))
        )
      })
    ).subscribe(({data, index}) => {
      console.log({data, index})
      this.tables.forEach((item, elemIndex) => {
        if (elemIndex === index) {
          item.setData(data?.data, data?.total_entries)
        }
      })
      this.loading = false
    }, (err) => console.error(err))
  }

  seeMore(vehicle: any) {
    this.router.navigate(['active-vehicle/detail', vehicle.id]);
  }
}
