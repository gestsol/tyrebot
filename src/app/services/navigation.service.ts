import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface MenuItem {
  name: string
  route?: string
  list?: MenuItem[]
  open?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  navOpen = new BehaviorSubject(false)
  navOpen$ = this.navOpen.asObservable()

  menu: MenuItem[] = [
    {
      name: 'Informacion de Mi Perfil'
    },
    {
      name: 'Administrar Cuentas'
    },
    {
      name: 'Vehículo',
      open: false,
      list: [
        {
          name: 'Vehículos Activos'
        },
        {
          name: 'Agregar Vehículo',
          route: '/add-vehicle'
        },
        {
          name: 'Editar Existente'
        }
      ]
    },
    {
      name: 'Configuración'
    }
  ]

  constructor() { }

  open(value: boolean) {
    this.navOpen.next(value)
  }
}
