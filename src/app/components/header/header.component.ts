import { Component, OnInit, OnDestroy } from '@angular/core';
import { formatDate } from '@angular/common';
import { NavigationService } from 'src/app/services/navigation.service';
import * as moment from 'moment';

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
    moment.locale('es')
    this.interval = setInterval(() => {
      this.jstoday = moment().format('hh:mm:ss A[,] d [de] MMMM yyyy');
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
