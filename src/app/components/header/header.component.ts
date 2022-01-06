import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  today= new Date();
  jstoday = '';

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.jstoday = formatDate(this.today, 'hh:mm:ss a  dd MMMM yyyy', 'en-US', '+0530');
  }

  toggleNav() {
    this.navigationService.toggle()
  }

}
