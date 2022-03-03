import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common'
import { BehaviorSubject } from 'rxjs';
import { Roles, SessionService } from './session.service';
import { MainService } from '../pages/main/main.service';

export interface MenuItem {
  name: string
  active: boolean
  route?: string
  list?: MenuItem[]
  open?: boolean
  classes?: string
  inactive?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private previousUrl: string = '';

  private currentUrl = new BehaviorSubject('')
  currentUrl$ = this.currentUrl.asObservable()

  initialMmenu: MenuItem[] = [
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
