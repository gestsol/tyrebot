import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Company, CompanyService } from 'src/app/services/company.service';
import { AjaxDialogAction, AjaxDialogResult } from '../../main/main.service';
import { ManageCompaniesDetailComponent } from '../manage-companies-detail/manage-companies-detail.component';

@Component({
  selector: 'app-manage-companies-list',
  templateUrl: './manage-companies-list.component.html',
  styleUrls: ['./manage-companies-list.component.scss']
})
export class ManageCompaniesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource = new MatTableDataSource<Company>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private companyService: CompanyService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.setTable()
  }

  ngAfterViewInit() {
    this.paginator._formFieldAppearance = 'outline'
    this.dataSource.paginator = this.paginator;
  }

  create() {
    this.editDialog({action: AjaxDialogAction.create})
  }

  edit(data: Required<Company>) {
    this.editDialog({...data, action: AjaxDialogAction.update})
  }

  editDialog(data: Partial<Company> & {action: AjaxDialogAction}) {
    const dialogRef = this.dialog.open(ManageCompaniesDetailComponent, {
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
    this.companyService.getAll().subscribe(list => {
      this.dataSource.data = list.map((item) => ({
        id: item.id,
        name: item.name
      })).sort((a, b) => a.id - b.id)
    })
  }

  delete(vehicle: any) {
    const dialogRef = this.dialog.open(DeleteCompanyDialog, {
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
      <h1 class="dialog__title">Eliminar Compañía</h1>
      <div>¿Esta seguro de eliminar esta compañía?</div>
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
export class DeleteCompanyDialog {
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteCompanyDialog>,
    private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) {}

  ok() {
    this.loading = true
    this.companyService.delete(this.id).subscribe(() => {
      this.dialogRef.close(true)
      this.loading = false
    }, (err) => {
      this.dialogRef.close(false)
      this.loading = false
    })
  }
}
