import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private previousUrl: string = '';

  private currentUrl = new BehaviorSubject('')
  currentUrl$ = this.currentUrl.asObservable()

  constructor(
    private router: Router,
    private location: Location
  ) {
    this.urlTracking();
  }

  getPreviousUrl() {
    return this.previousUrl;
  }

  back() {
    this.location.back();
  }

  replace(url: string) {
    this.location.replaceState(url);
  }

  getFullUrl(route: ActivatedRoute) {
    let parent: ActivatedRoute | null = route
    const segments: string[] = []
    while (parent) {
      const path = parent.snapshot.url.map(item => item.path)
        .filter(item => item != '')
        .join('/')
      segments.push(path)
      parent = parent.parent
    }

    return segments.reverse().filter(item => item != '').join('/')
  }

  private urlTracking() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl.value;
        this.currentUrl.next(event.urlAfterRedirects)
      }
    })
  }
}
