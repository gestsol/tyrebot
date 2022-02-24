import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MenuItem, NavigationService } from 'src/app/services/navigation.service';
import { SessionService } from 'src/app/services/session.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  menu: MenuItem[] = []

  constructor(
    private navigation: NavigationService,
    private sessionService: SessionService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.menu = this.navigation.menu
    this.navigation.currentUrl$.subscribe((url) => {
      this.menu.map((lvl1Item) => {
        if (lvl1Item?.route && url.includes(lvl1Item.route)) {
          lvl1Item.active = true
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

  logout() {
    if (window.innerWidth <= 1200) {
      this.navigation.toggle()
    }
    const dialogRef = this.dialog.open(LogoutDialog, {
      width: '30vw',
      maxWidth: 648,
      minWidth: 300,
      panelClass: 'custom-dialog',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        this.sessionService.logout()
      }
    })
  }
}

@Component({
  selector: 'app-delete-vehicle-dialog',
  template: `
    <div class="dialog">
      <h1 class="dialog__title">Cerrar Sesión</h1>
      <div>¿Esta seguro de que desea cerrar sesión?</div>
      <div class="dialog__actions">
        <button mat-button [mat-dialog-close]="false"
          class="dialog__btn form-btn form-btn--back-btn form-btn--block">
         Cancelar
        </button>
        <button class="form-btn form-btn--block dialog__btn" (click)="action(true)">
          <span>
           Aceptar
          </span>
        </button>
      </div>
    </div>
  `,
})
export class LogoutDialog {
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<LogoutDialog>
  ) {}

  action(value: boolean) {
    this.dialogRef.close(value)
  }
}
