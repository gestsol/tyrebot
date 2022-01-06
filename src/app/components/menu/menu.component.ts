import { Component, OnInit } from '@angular/core';
import { MenuItem, NavigationService } from 'src/app/services/navigation.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menu: MenuItem[] = []

  constructor(
    private navigation: NavigationService
  ) { }

  ngOnInit(): void {
    this.menu = this.navigation.menu
    this.navigation.currentUrl$.subscribe((url) => {
      console.log('segments', url)
      this.menu.map((lvl1Item) => {
        if (lvl1Item.route) {
          lvl1Item.route === url
          lvl1Item.active = true
        } else if (lvl1Item.list) {
          lvl1Item.list.map(lvl2Item => {
            if (lvl2Item.route === url) {
              lvl1Item.active = true
              lvl2Item.active = true
              this.openLevel(lvl1Item, true)
            }
            return lvl2Item
          })
        }
        return lvl1Item
      })
    })
  }

  openLevel(item: MenuItem, value?: boolean) {
    if (value != null) {
      item.open = value
    } else {
      item.open = !item.open
    }
  }


}
