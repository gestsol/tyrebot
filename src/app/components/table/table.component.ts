import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() loading = false;
  @Input() columns: {key: string, name: string}[] = [];
  @Output() pageChange = new EventEmitter<MatPaginator>();
  @Output() edit = new EventEmitter<number>();
  @Output() seeMore = new EventEmitter<number>();
  resultsLength = 0;

  displayedColumns: string[] = []

  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngOnInit() {
    this.displayedColumns = this.columns.map((item) => item.key);
  }

  pageChanged() {
    return this.pageChange.emit(this.paginator)
  }

  ngAfterViewInit() {
    this.paginator._formFieldAppearance = 'outline'
  }

  setData(data: any, length: number) {
    this.dataSource = new MatTableDataSource(data);
    this.resultsLength = length
  }
}
