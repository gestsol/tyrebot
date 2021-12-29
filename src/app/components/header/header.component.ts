import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  today= new Date();
  jstoday = '';
  constructor() { 
	this.jstoday = formatDate(this.today, 'hh:mm:ss a  dd MMMM yyyy', 'en-US', '+0530');
  }

  ngOnInit(): void {
  }

}
