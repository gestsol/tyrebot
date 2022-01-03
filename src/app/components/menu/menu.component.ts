import { Component, OnInit } from '@angular/core';
import { MenuItem, NavigationService } from 'src/app/services/navigation.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menu: MenuItem[] = []

  constructor(private navigation: NavigationService) { }

  ngOnInit(): void {
    this.menu = this.navigation.menu
  }

  openNav(item: MenuItem) {
    item.open = !item.open
    console.log(item)
  }


}
