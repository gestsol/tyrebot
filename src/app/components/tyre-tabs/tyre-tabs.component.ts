import { Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription, zip } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-tyre-tabs',
  templateUrl: './tyre-tabs.component.html',
  styleUrls: ['./tyre-tabs.component.scss']
})
export class TyreTabsComponent implements OnInit {
  @Input() request: (index: number) => Observable<{data: any; total_entries: any;}> = () => of({data: [], total_entries: 0});
  @Input() tabs: string[] = [];
  @Input() columns: {key: string, name: string}[] = [];

  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup
  @ViewChildren(TableComponent) tables!: QueryList<TableComponent>;

  tableSub: Subscription | null = null
  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  }

  getData() {
    this.loading = true;
    this.tabGroup.selectedTabChange.pipe(
      startWith({index: 0}),
      switchMap((event) => {
        return this.request(event.index).pipe(
          map(data => ({data, index: event.index})),
          catchError((err) => of({data: null, index: event.index}))
        )
      })
    ).subscribe(({data, index}) => {
      this.tables.forEach((item, elemIndex) => {
        if (elemIndex === index) {
          item.setData(data?.data, data?.total_entries)
        }
      })
      this.loading = false
    }, (err) => {
      console.error(err)
      this.loading = false
    })
  }

  ngOnDestroy(): void {
    this.tableSub?.unsubscribe()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.route.params.subscribe((params) => {
        const tab = params['tab'] || 0
        this.tabGroup.selectedIndex = tab
        this.getData();
      })
    }, 0)
  }

  seeMore(vehicle: any) {
    this.router.navigate(['active-vehicle/detail', vehicle.id]);
  }

}
