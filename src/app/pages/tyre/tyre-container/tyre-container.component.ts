import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationService } from 'src/app/services/navigation.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-tyre-container',
  templateUrl: './tyre-container.component.html',
  styleUrls: ['./tyre-container.component.scss']
})
export class TyreContainerComponent implements OnInit {
  vehicles$ = this.dashboardService.vehicles$;

  showBackBtn = false

  constructor(
    private dashboardService: DashboardService,
    private navigationService: NavigationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.navigationService.currentUrl$.subscribe((url) => {
      this.showBackBtn = url.includes('detail')
    })
  }

}
