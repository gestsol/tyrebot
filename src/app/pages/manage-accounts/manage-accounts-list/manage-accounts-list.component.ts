import { Route } from '@angular/compiler/src/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { UserService } from 'src/app/services/user.service';

enum State {
  access = 'Acceso',
  denied = 'Denegado'
}


export interface TableItem {
  email: string;
  last_login: string;
  active: boolean;
}


@Component({
  selector: 'app-manage-accounts-list',
  templateUrl: './manage-accounts-list.component.html',
  styleUrls: ['./manage-accounts-list.component.scss']
})
export class ManageAccountsListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'last_connection', 'state'];
  dataSource = new MatTableDataSource<TableItem>();

  states = State

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.userService.getAll().subscribe((list) => {
      this.dataSource.data = list.map((item) => ({
        email: item.email,
        last_login: item.last_login? moment(item.last_login, 'YYYY-MM-DDTHH:mm:ss').format('DD/MM/YYYY HH:mm:ss') : 'N/A',
        active: item.active
      }))
    })
  }

  ngAfterViewInit() {
    this.paginator._formFieldAppearance = 'outline'
    this.dataSource.paginator = this.paginator;
  }

  toDetail() {
    this.router.navigate(['detail', 1], {
      relativeTo: this.route,
    })
  }
}
