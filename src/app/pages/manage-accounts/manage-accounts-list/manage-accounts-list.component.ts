import { Route } from '@angular/compiler/src/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

enum State {
  access = 'Acceso',
  denied = 'Denegado'
}


export interface PeriodicElement {
  name: string;
  last_connection: number;
  state: State;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Hydrogen', last_connection: 1, state: State.access},
  {name: 'Helium', last_connection: 2, state: State.access},
  {name: 'Lithium', last_connection: 3, state: State.access},
  {name: 'Beryllium', last_connection: 4, state: State.access},
  {name: 'Boron', last_connection: 5, state: State.access},
  {name: 'Carbon', last_connection: 6, state: State.access},
  {name: 'Nitrogen', last_connection: 7, state: State.access},
  {name: 'Oxygen', last_connection: 8, state: State.denied},
  {name: 'Fluorine', last_connection: 9, state: State.access},
  {name: 'Neon', last_connection: 10, state: State.access},
  {name: 'Sodium', last_connection: 11, state: State.access},
  {name: 'Magnesium', last_connection: 12, state: State.denied},
  {name: 'Aluminum', last_connection: 13, state: State.access},
  {name: 'Silicon', last_connection: 14, state: State.access},
  {name: 'Phosphorus', last_connection: 15, state: State.access}
];

@Component({
  selector: 'app-manage-accounts-list',
  templateUrl: './manage-accounts-list.component.html',
  styleUrls: ['./manage-accounts-list.component.scss']
})
export class ManageAccountsListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'last_connection', 'state'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  states = State

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
