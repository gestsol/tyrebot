import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common'
import { BehaviorSubject } from 'rxjs';

export interface MenuItem {
  name: string
  active: boolean
  route?: string
  list?: MenuItem[]
  open?: boolean
  classes?: string
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private previousUrl: string = '';

  private navOpen = new BehaviorSubject(false)
  navOpen$ = this.navOpen.asObservable()

  private currentUrl = new BehaviorSubject('')
  currentUrl$ = this.currentUrl.asObservable()

  menu: MenuItem[] = [
    {
      name: 'Informacion de Mi Perfil',
      active: false
    },
    {
      name: 'Administrar Cuentas',
      active: false,
      route: '/manage-accounts'
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
      active: false
    }
  ]

  constructor(
    private router: Router,
    private location: Location
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl.value;
        this.currentUrl.next(event.urlAfterRedirects)
      }
    })
  }

  toggle() {
    this.navOpen.next(!this.navOpen.value)
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }

  back() {
    this.location.back();
  }
}
