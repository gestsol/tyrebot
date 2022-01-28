import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, of, Subject, Subscription } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { FiltersService } from 'src/app/components/filters/filters.service';
import { ActiveVehiclesService } from '../../active-vehicles/active-vehicles.service';

@Component({
  selector: 'app-pressure-list',
  templateUrl: './pressure-list.component.html',
  styleUrls: ['./pressure-list.component.scss']
})
export class PressureListComponent implements OnInit {
  tabs = ['Optima', 'Alta', 'Baja'];
  tableSub: Subscription | null = null
  pageSub = new BehaviorSubject(0)
  loading = false;
  resultsLength = 0;
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

  displayedColumns: string[] = this.columns.map((item) => item.key);
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSubscription: Subscription | null = null

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

  pageChange() {
    this.pageSub.next(0)
  }

  ngAfterViewInit() {
    this.paginator._formFieldAppearance = 'outline'
    setTimeout(() => {
      this.tableSub = combineLatest([this.pageSub, this.filterService.plate$]).pipe(
        startWith([0, '']),
        switchMap((data) => {
          this.loading = true;
          return this.activeVehicleService.getVehicles(
            this.paginator.pageIndex + 1,
            this.paginator.pageSize,
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
        this.dataSource = new MatTableDataSource(data.data);
        this.loading = false
        this.resultsLength = data.total_entries
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
