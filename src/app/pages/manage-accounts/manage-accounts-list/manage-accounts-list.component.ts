import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Roles } from 'src/app/services/session.service';
import { User, UserService } from 'src/app/services/user.service';
import { AjaxDialogAction, AjaxDialogResult, MainService } from '../../main/main.service';
import { ManageAccountsDetailComponent } from '../manage-accounts-detail/manage-accounts-detail.component';

enum State {
  access = 'Acceso',
  denied = 'Denegado'
}


export interface TableItem {
  id: number;
  email: string;
  last_login: string;
  active: boolean;
  company_name: string;
}

@Component({
  selector: 'app-manage-accounts-list',
  templateUrl: './manage-accounts-list.component.html',
  styleUrls: ['./manage-accounts-list.component.scss']
})
export class ManageAccountsListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'company_name', 'last_connection', 'state', 'actions'];
  dataSource = new MatTableDataSource<TableItem>();

  actualUser: User | null = null
  states = State

  roles = Roles

  constructor(
    private userService: UserService,
    private mainService: MainService,
    public dialog: MatDialog
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.mainService.actualUser$.subscribe((user) => this.actualUser = user)
    this.setTable()
  }

  ngAfterViewInit() {
    this.paginator._formFieldAppearance = 'outline'
    this.dataSource.paginator = this.paginator;
  }

  create() {
    this.editDiaplog({action: AjaxDialogAction.create})
  }

  edit(data: Required<User>) {
    this.editDiaplog({...data, action: AjaxDialogAction.update})
  }

  editDiaplog(data: Partial<User> & {action: AjaxDialogAction}) {
    const dialogRef = this.dialog.open(ManageAccountsDetailComponent, {
      data,
      width: '60vw',
      maxWidth: 500,
      minWidth: 300,
      panelClass: 'custom-dialog',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((value: AjaxDialogResult) => {
      console.log(value)
      if (value === AjaxDialogResult.success) {
        this.setTable()
      }
    })
  }

  setTable() {
    this.userService.getAll().subscribe((list) => {
      this.dataSource.data = list.map((item) => ({
        ...item,
        last_login: item.last_login ?
          moment(item.last_login, 'YYYY-MM-DDTHH:mm:ss').format('DD/MM/YYYY HH:mm:ss') :
          'N/A'
      })).sort((a, b) => a.id - b.id)
    })
  }

  delete(vehicle: any) {
    const dialogRef = this.dialog.open(DeleteUserDialog, {
      data: vehicle.id,
      width: '30vw',
      maxWidth: 648,
      minWidth: 300,
      panelClass: 'custom-dialog',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.setTable()
      }
    })
  }
}

@Component({
  selector: 'app-delete-vehicle-dialog',
  template: `
    <div class="dialog">
      <h1 class="dialog__title">Eliminar Usuario</h1>
      <div>¿Esta seguro de eliminar este usuario?</div>
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
export class DeleteUserDialog {
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialog>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) {}

  ok() {
    this.loading = true
    this.userService.delete(this.id).subscribe(() => {
      this.dialogRef.close(true)
      this.loading = false
    }, (err) => {
      this.dialogRef.close(false)
      this.loading = false
    })
  }
}
