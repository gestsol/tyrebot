import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
    {key: 'measurements_count', name: 'Mediciones'},
    {key: 'tpms_name', name: 'TPMS id'},
    {key: 'tpms_type', name: 'TPMS tipo'},
    {key: 'tpms_installation_date', name: 'Instalación TPMS'},
    {key: 'tyre_manufacturing_date', name: 'Fabricación del neumático'},
    {key: 'tyre_installation_date', name: 'Instalación del neumático'},
    {key: 'tyre_brand', name: 'Marca'},
    {key: 'tyre_provider', name: 'Proveedor'},
    {key: 'dot', name: 'DOT'},
    {key: 'tyre_index', name: 'Indice carga/vel'},
    {key: 'tyre_tyre_measurementss', name: 'Medidas'}
  ]
  dataSubscription: Subscription | null = null

  constructor(
    private route: ActivatedRoute,
    private filterService: FiltersService,
    private activeVehicleService: ActiveVehiclesService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = parseInt(params['id'])
        this.filterService.date$.subscribe(value => {
          this.dateFrom = value.from
          this.dateTo = value.to
          this.getData(this.id)
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe()
  }

  getData(id: number) {
    this.loading = true
    if (this.dataSubscription && !this.dataSubscription.closed) {
      this.dataSubscription.unsubscribe()
    }
    this.dataSubscription = this.activeVehicleService.getBusData(id, this.dateFrom, this.dateTo).subscribe((data) => {
      this.busData = data
      this.loading = false
    })
  }
}
