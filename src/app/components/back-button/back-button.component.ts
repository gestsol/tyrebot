import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {
  @Input() path = ''

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navigationService: NavigationService
  ) { }

  ngOnInit(): void {
  }

  back() {
    const prev = this.navigationService.getPreviousUrl()
    if (prev && prev === this.path) {
      this.navigationService.back()
    } else if (this.path) {
      this.router.navigate([this.path], {
        relativeTo: this.route
      })
    } else {
      this.navigationService.back()
    }
  }
}
