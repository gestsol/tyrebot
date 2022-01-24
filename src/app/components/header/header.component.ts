import { Component, OnInit, OnDestroy } from '@angular/core';
import { formatDate } from '@angular/common';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  jstoday = '';
  interval: any = null;

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.jstoday = formatDate(new Date(), 'hh:mm:ss a  dd MMMM yyyy', 'en-US', '+0530');
    }, 1000)
  }

  toggleNav() {
    this.navigationService.toggle()
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

}
