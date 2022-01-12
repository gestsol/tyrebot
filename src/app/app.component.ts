import { Component, OnInit } from '@angular/core';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tyrebot';
  navState: boolean = true;

  constructor(private navigation: NavigationService) {}

  ngOnInit() {
    this.navigation.navOpen$.subscribe((value) => {
      this.navState = value;
    })
  }

  close() {
    this.navigation.toggle()
  }
}
