import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {
  @Input() path = ''

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  back() {
	  this.router.navigate([this.path])
  }

}
