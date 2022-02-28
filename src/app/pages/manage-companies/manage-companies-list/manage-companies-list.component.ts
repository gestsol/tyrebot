import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Company, CompanyService } from 'src/app/services/company.service';
import { AjaxDialogResult, ManageCompaniesDetailComponent } from '../manage-companies-detail/manage-companies-detail.component';

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
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.companyService.getAll().subscribe((list) => {
      this.setTable(list)
    })
  }

  ngAfterViewInit() {
    this.paginator._formFieldAppearance = 'outline'
    this.dataSource.paginator = this.paginator;
  }

  edit(data: Required<Company>) {
    const dialogRef = this.dialog.open(ManageCompaniesDetailComponent, {
      data,
      width: '30vw',
      maxWidth: 648,
      minWidth: 300,
      panelClass: 'custom-dialog',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe((value: AjaxDialogResult) => {
      console.log(value)
      if (value === AjaxDialogResult.success) {
        this.companyService.getAll().subscribe(data => this.setTable(data))
      }
    })
  }

  setTable(list: Required<Company>[]) {
    this.dataSource.data = list.map((item) => ({
      id: item.id,
      name: item.name
    })).sort((a, b) => a.id - b.id)
  }
}
