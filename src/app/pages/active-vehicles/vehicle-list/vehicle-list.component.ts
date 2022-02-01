import {AfterViewInit, Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, of, Subscription } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { FiltersService } from 'src/app/components/filters/filters.service';
import { TableComponent } from 'src/app/components/table/table.component';
import { ActiveVehiclesService } from '../active-vehicles.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit, OnDestroy, AfterViewInit {
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
      name: 'ID HUB'
    },
    {
      key: 'chassis',
      name: 'Modelo Chasis'
    },
    {
      key: 'action',
      name: 'Acciones'
    }
  ];

  @ViewChild(TableComponent) table!: TableComponent;

  constructor(
    private activeVehicleService: ActiveVehiclesService,
    private filterService: FiltersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.tableSub?.unsubscribe()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.tableSub = combineLatest([this.table.pageChange, this.filterService.plate$]).pipe(
        startWith([{pageIndex: 0, pageSize: 1}, ''] as [{pageIndex: number, pageSize: number}, string]),
        switchMap((data) => {
          this.loading = true;
          return this.activeVehicleService.getVehicles(
            data[0].pageIndex + 1,
            data[0].pageSize,
            data[1] as string
          ).pipe(
            map((data) => data),
            catchError((err) => {
              console.error(err)
              return of(null)
            })
          );
        })
      ).subscribe((data) => {
        this.table.setData(data.data, data.total_entries)
        this.loading = false
      });
    }, 0)
  }

  seeMore(vehicle: any) {
    this.router.navigate(['../detail', vehicle.id], {
      relativeTo: this.route
    })
  }

  edit(vehicle: any) {
    this.router.navigate(['../edit', vehicle.id], {
      relativeTo: this.route
    })
  }
}
