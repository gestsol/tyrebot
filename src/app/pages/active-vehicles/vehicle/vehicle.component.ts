import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { FiltersService } from 'src/app/components/filters/filters.service';
import { ActiveVehiclesService } from '../active-vehicles.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit, OnDestroy {
  id: number = 0;
  busData: any;
  loading = false;
  dateFrom: string = '';
  dateTo: string = '';
  tpmsKeysNames = [
    {key: 'min_max_temp', name: 'Temp. Min/Max'},
    {key: 'min_max_pressure', name: 'Presión Min/Max'},
    {key: 'average_pressure', name: 'Promedio de P.'},
    {key: 'actual_pressure', name: 'Presión actual'},
    {key: 'actual_temp', name: 'Temperatura actual'},
    {key: 'measurements_count', name: 'Mediciones'},
    {key: 'last_mesurement', name: 'Última medición'},
    {key: 'tpms_name', name: 'TPMS id'},
    {key: 'tpms_type', name: 'TPMS tipo'},
    {key: 'tpms_installation_date', name: 'Instalación TPMS'},
    {key: 'tpms_manufacturer', name: 'Fabricante TPMS'},
    {key: 'manufacture_date', name: 'Fecha Vencimiento Neumático'},
    {key: 'install_date', name: 'Instalación del neumático'},
    {key: 'brand', name: 'Marca'},
    {key: 'provider', name: 'Proveedor'},
    {key: 'dot', name: 'DOT'},
    {key: 'index', name: 'Indice carga/vel'},
    {key: 'measurementss', name: 'Medidas'}
  ]
  dataSubscription: Subscription | null = null

  vehicles$ = this.activeVehicleService.vehicles$;

  constructor(
    private route: ActivatedRoute,
    private filterService: FiltersService,
    private activeVehicleService: ActiveVehiclesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = parseInt(params['id'])
        this.dataSubscription = this.filterService.date$.pipe(
          startWith({from: '', to: ''}),
          switchMap((value) => {
            this.dateFrom = value.from
            this.dateTo = value.to
            return this.activeVehicleService.getBusData(this.id, this.dateFrom, this.dateTo)
          })
        ).subscribe((data) => {
          this.busData = data
          this.loading = false
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe()
  }
}
