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
      this.menu.map((lvl1Item) => {
        if (lvl1Item.route) {
          lvl1Item.active = lvl1Item.route === url
        } else if (lvl1Item.list) {
          let founded = false
          lvl1Item.list.map(lvl2Item => {
            if (lvl2Item?.route && url.includes(lvl2Item.route)) {
              founded = true
              lvl2Item.active = true
            } else {
              lvl2Item.active = false
            }
            return {...lvl2Item}
          })
          this.openLevel(lvl1Item, founded)
          lvl1Item.active = founded
        } else {
          lvl1Item.active = false
        }
        return {...lvl1Item}
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

  close() {
    this.navigation.toggle()
  }

  selectMenuItem(item: MenuItem) {
    this.openLevel(item)
    if (item.route && window.innerWidth <= 1200) {
      this.close()
    }
  }
}
