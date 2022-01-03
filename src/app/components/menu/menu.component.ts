import { Component, OnInit } from '@angular/core';

interface MenuItem {
  name: string
  route?: string
  list?: MenuItem[]
  open?: boolean
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
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
          route: '/addVehicle'
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

  ngOnInit(): void {
  }

  openNav(item: MenuItem) {
    item.open = !item.open
    console.log(item)
  }


}
