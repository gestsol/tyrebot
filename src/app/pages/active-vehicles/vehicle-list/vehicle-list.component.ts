import {AfterViewInit, Component, OnInit, OnDestroy, ViewChild, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, of, Subject, Subscription } from 'rxjs';
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
  dialogDelete = new BehaviorSubject(null)
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

  vehicles$ = this.activeVehicleService.vehicles$;

  constructor(
    private activeVehicleService: ActiveVehiclesService,
    private filterService: FiltersService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.tableSub?.unsubscribe()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.tableSub = combineLatest([this.table.pageChange, this.filterService.plate$, this.dialogDelete]).pipe(
        startWith(
          [{pageIndex: 0, pageSize: 1}, '', null] as [{pageIndex: number, pageSize: number}, string, null]),
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
        this.table.setData(data?.data, data?.total_entries)
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

  delete(vehicle: any) {
    const dialogRef = this.dialog.open(DeleteVehicleDialog, {
      data: vehicle.id,
      width: '30vw',
      maxWidth: 648,
      minWidth: 300,
      panelClass: 'custom-dialog',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.dialogDelete.next(null)
      }
    })
  }
}

@Component({
  selector: 'app-delete-vehicle-dialog',
  template: `
    <div class="dialog">
      <h1 class="dialog__title">Eliminar Vehículo</h1>
      <div>¿Esta seguro de eliminar el vehículo?</div>
      <div class="dialog__actions">
        <button mat-button [mat-dialog-close]="false"
          class="dialog__btn form-btn form-btn--back-btn form-btn--block">
         Cancelar
        </button>
        <button class="form-btn form-btn--block dialog__btn" (click)="ok()">
          <span *ngIf="loading">
           <mat-spinner [diameter]="30"></mat-spinner>
          </span>
          <span *ngIf="!loading">
           Aceptar
          </span>
        </button>
      </div>
    </div>
  `,
})
export class DeleteVehicleDialog {
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteVehicleDialog>,
    private activeVehicleService: ActiveVehiclesService,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) {}

  ok() {
    this.loading = true
    this.activeVehicleService.deleteVehicle(this.id).subscribe(() => {
      this.dialogRef.close(true)
      this.loading = false
    }, (err) => {
      this.dialogRef.close(false)
      this.loading = false
    })
  }
}
