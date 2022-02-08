import { Component, ContentChild, Input, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription, zip } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { DashboardService } from 'src/app/pages/tyre/dashboard.service';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-tyre-tabs',
  templateUrl: './tyre-tabs.component.html',
  styleUrls: ['./tyre-tabs.component.scss']
})
export class TyreTabsComponent implements OnInit {
  @Input() tabs: string[] = [];
  @Input() columns: {key: string, name: string}[] = [];

  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup
  @ViewChildren(TableComponent) tables!: QueryList<TableComponent>;

  types: string[] = [];
  tableSub: Subscription | null = null
  loading = false;

  constructor(
    private dashboardService: DashboardService,
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
        return this.dashboardService.getTableLecture(this.types[event.index]).pipe(
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
      this.loading = false
    })
  }

  ngOnDestroy(): void {
    this.tableSub?.unsubscribe()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      zip(this.route.data, this.route.params).subscribe(([data, params]) => {
        this.types = data.types;
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
