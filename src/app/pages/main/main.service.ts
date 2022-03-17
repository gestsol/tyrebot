import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompanyService } from 'src/app/services/company.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { Roles } from 'src/app/services/session.service';
import { User, UserService } from 'src/app/services/user.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { getActualUserId } from 'src/app/utils/token';
import produce, {setAutoFreeze} from "immer"

setAutoFreeze(false)

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

export interface MenuItem {
  name: string
  active: boolean
  route?: string
  list?: MenuItem[]
  open?: boolean
  classes?: string
  inactive?: boolean
}
@Injectable()
export class MainService {
  initialMenu: MenuItem[] = [
    {
      name: 'Informacion de Mi Perfil',
      active: false
    },
    {
      name: 'Vehículo',
      active: false,
      open: false,
      list: [
        {
          name: 'Vehículos Activos',
          active: false,
          route: '/active-vehicle'
        },
        {
          name: 'Agregar Vehículo',
          active: false,
          route: '/add-vehicle'
        }
      ]
    },
    {
      name: 'Neumáticos',
      active: false,
      route: '/tyres'
    },
    {
      name: 'Mi Cuenta',
      active: false,
      classes: 'mobile',
      list: [
        {
          name: 'Cambiar cuenta',
          active: false,
        },
        {
          name: 'Configuración',
          active: false,
        },
        {
          name: 'Soporte',
          active: false,
        }
      ]
    },
    {
      name: 'Configuración',
      active: false,
      open: false,
      inactive: false,
      list: [
        {
          name: 'Administrar Compañías',
          active: false,
          inactive: false,
          route: '/manage-companies'
        },
        {
          name: 'Administrar Cuentas',
          active: false,
          route: '/manage-accounts'
        },
      ]
    }
  ]

  private subActualUser = new BehaviorSubject<User | null>(null);
  actualUser$ = this.subActualUser.asObservable();

  private subMenu = new BehaviorSubject(this.initialMenu)
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
      const newMenu = produce<MenuItem[]>(this.initialMenu, initialMenu => {
        if (actualUser?.role === Roles.Admin) {
          const list = initialMenu[initialMenu.length - 1].list
          if (list) {
            list[0].inactive = true
          }
        }
        if (actualUser?.role === Roles.Standart) {
          initialMenu[initialMenu.length - 1].inactive = true
        }
      })

      this.subMenu.next(newMenu)
    })
  }

  toggle() {
    this.navOpen.next(!this.navOpen.value)
  }
}
