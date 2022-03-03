import { Component, OnInit, OnDestroy } from '@angular/core';
import { formatDate } from '@angular/common';
import { NavigationService } from 'src/app/services/navigation.service';
import * as moment from 'moment';
import { MainService } from 'src/app/pages/main/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  jstoday = '';
  interval: any = null;

  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    moment.locale('es')
    this.interval = setInterval(() => {
      this.jstoday = moment().format('hh:mm:ss A[,] d [de] MMMM yyyy');
    }, 1000)
  }

  toggleNav() {
    this.mainService.toggle()
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }

}
