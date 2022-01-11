import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit, AfterViewInit {
  loading = false;
  columns: {key: string, name: string}[] = [
    {
      key: 'plate',
      name: 'Patente'
    },
    {
      key: 'internal_number',
      name: 'Nº de Vehículo'
    },
    {
      key: 'axies',
      name: 'Ejes'
    },
    {
      key: 'hubId',
      name: 'ID HUB'
    },
    {
      key: 'chassis',
      name: 'Modelo Chasis'
    },
    {
      key: 'action',
      name: 'Detalles'
    }
  ];

  displayedColumns: string[] = this.columns.map((item) => item.key);
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true
    this.vehicleService.getVehicles().subscribe((response: any[]) => {
      const data: any = response.map((item) => ({
        id: item.id,
        axies: item.format?.axies_count,
        chassis: item.chassis,
        internal_number: item.internal_number,
        plate: item.plate,
        hubId: item.hub_tpms.name
      }));
      this.dataSource = new MatTableDataSource(data);
      this.loading = false
    }, (err) => {
      this.loading = false
      console.error(err)
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  seeMore(vehicle: any) {
    this.router.navigate(['./detail', vehicle.id], {
      relativeTo: this.route
    })
  }
}
