import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-tyre-container',
  templateUrl: './tyre-container.component.html',
  styleUrls: ['./tyre-container.component.scss']
})
export class TyreContainerComponent implements OnInit {
  showBackBtn = false

  constructor(
    private navigationService: NavigationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.navigationService.currentUrl$.subscribe((url) => {
      this.showBackBtn = url.includes('detail')
    })
  }

}
