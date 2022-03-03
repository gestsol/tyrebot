import { Injectable } from '@angular/core';
import { BehaviorSubject, defer, iif, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompanyService } from 'src/app/services/company.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Roles } from 'src/app/services/session.service';
import { User, UserService } from 'src/app/services/user.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { getActualUserId } from 'src/app/utils/token';

export enum AjaxDialogResult {
  success = 1,
  error = 2,
  close = 3
}

export enum AjaxDialogAction {
  view = 1,
  update = 2,
  create = 3
}

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private subActualUser = new BehaviorSubject<User | null>(null);
  actualUser$ = this.subActualUser.asObservable();

  private subMenu = new BehaviorSubject(this.navigationService.initialMmenu)
  menu$ = this.subMenu.asObservable()

  private navOpen = new BehaviorSubject(false)
  navOpen$ = this.navOpen.asObservable()

  constructor(
    private companyService: CompanyService,
    private vehicleService: VehicleService,
    private userService: UserService,
    private navigationService: NavigationService
  ) {}

  initData() {
    this.vehicleService.getTyreBrands().subscribe()
    this.vehicleService.getTyreStatusList().subscribe()
    this.companyService.getAll().subscribe()
    const id = getActualUserId()
    if (id) {
      this.getActualUser(id).subscribe()
    }
    this.configureMenu()
  }

  getActualUser(id: string) {
    console.log(id, !!id)
    return this.userService.getOne(parseInt(id as string)).pipe(
      map((user) => {
        console.log(user)
        if (user) {
          this.subActualUser.next(user)
        }
        return user
      })
    )
  }

  private configureMenu() {
    this.actualUser$.subscribe((actualUser) => {
      if (!actualUser) return
      const {initialMmenu} = this.navigationService
      console.log(actualUser, 'user')
      if (actualUser?.role === Roles.Admin) {
        const list = initialMmenu[initialMmenu.length - 1].list
        if (list) {
          list[0].inactive = true
        }
      }
      if (actualUser?.role === Roles.Standart) {
        initialMmenu[initialMmenu.length - 1].inactive = true
      }
      this.subMenu.next(initialMmenu)
    })
  }

  toggle() {
    this.navOpen.next(!this.navOpen.value)
  }
}
