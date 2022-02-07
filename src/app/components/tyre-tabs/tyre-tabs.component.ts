import { Component, ContentChild, Input, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { DashboardService } from 'src/app/pages/tyre/dashboard.service';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-tyre-tabs',
  templateUrl: './tyre-tabs.component.html',
  styleUrls: ['./tyre-tabs.component.scss']
})
export class TyreTabsComponent implements OnInit {
  @Input() tabs: string[] = [];
  @Input() columns: {key: string, name: string}[] = [
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
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup
  @ViewChildren(TableComponent) tables!: QueryList<TableComponent>;

  types: string[] = [];
  tableSub: Subscription | null = null
  loading = false;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
      this.tables.forEach((item, elemIndex) => {
        if (elemIndex === index) {
          item.setData(data?.data, data?.total_entries)
        }
      })
      this.loading = false
    }, (err) => console.error(err))
  }

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

  seeMore(vehicle: any) {
    this.router.navigate(['active-vehicle/detail', vehicle.id]);
  }

}
