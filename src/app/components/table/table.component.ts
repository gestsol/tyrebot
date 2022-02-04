import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() loading = false;
  @Input() columns: {key: string, name: string}[] = [];
  @Output() edit = new EventEmitter<number>();
  @Output() seeMore = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  private subPage = new BehaviorSubject<{ pageIndex: number, pageSize: number }>({pageIndex: 0, pageSize: 1});
  pageChange = this.subPage.asObservable();

  resultsLength = 0;

  displayedColumns: string[] = []

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngOnInit() {
    this.displayedColumns = this.columns.map((item) => item.key);
  }

  pageChanged() {
    this.subPage.next(this.paginator)
  }

  ngAfterViewInit() {
    this.paginator._formFieldAppearance = 'outline'
    this.subPage.next({
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
    })
  }

  setData(data: any, length: number) {
    this.dataSource = new MatTableDataSource(data);
    this.resultsLength = length
  }
}
