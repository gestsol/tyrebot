import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrandKpiObj, DashboardService, ExpirationKpiObj, NominalValuesKpiObj, TotalKpiObj, TotalsKpi } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  kpiSubscriber: Subscription | null = null
  loadingTotals = false;
  loadingPressure = false;
  loadingTemperature = false;
  loadingBrand = false;
  loadingLifeByBranch = false;
  loadingExpired = false;
  loadingTyreAlerts = false;

  totalKpis: TotalKpiObj = new Array(5).fill({})
  totalPressure: NominalValuesKpiObj | null = null
  totalTemperature: NominalValuesKpiObj | null = null
  totalBrand: BrandKpiObj | null = null
  totalLifeByBrand: BrandKpiObj | null = null
  totalExpired: ExpirationKpiObj | null = null
  tyreAlerts = [
    {name: 'Alta temperatura', url: '/tyres/alert-list/0', value: 0},
    {name: 'Sensores sin lectura durante 48h', url: '/tyres/alert-list/3', value: 0},
    {name: 'Exceso de presion', url: '/tyres/alert-list/1', value: 0},
    {accent: true, name: 'Presión Baja', url: '/tyres/alert-list/2', value: 0}
  ]

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getKpis();
  }

  getKpis() {
    this.getTotals();
    this.getPressure();
    this.getTemperature();
    this.getBrands();
    this.getExpired();
    this.getLifeByBrand();
    this.getTyreAlertsCount();
  }

  getTotals() {
    this.loadingTotals = true
    this.dashboardService.getTotalsKpi()
    .subscribe((totals)=> {
      this.totalKpis = totals;
      this.loadingTotals = false
    },(err) => {
      this.loadingTotals = false
    })
  }

  getPressure() {
    this.loadingPressure = true
    this.dashboardService.getPressureKpi(() => this.loadingPressure = false)
    .subscribe((totals)=> {
      this.totalPressure = totals;
    },(err) => {
      console.error(err)
    })
  }

  getTemperature() {
    this.loadingTemperature = true
    this.dashboardService.getTemperatureKpi(() => this.loadingTemperature = false)
    .subscribe((totals)=> {
      this.totalTemperature = totals;
    })
  }

  getBrands() {
    this.loadingBrand = true
    this.dashboardService.getTyresByBrand()
    .subscribe((totals)=> {
      this.totalBrand = totals;
      console.log(this.totalBrand)
      this.loadingBrand = false
    },(err) => {
      this.loadingBrand = false
    })
  }

  getLifeByBrand() {
    this.loadingLifeByBranch = true
    this.dashboardService.getLifeByBrandKpi()
    .subscribe((totals)=> {
      this.totalLifeByBrand = totals;
      console.log(this.totalLifeByBrand)
      this.loadingLifeByBranch = false
    },(err) => {
      this.loadingLifeByBranch = false
    })
  }

  getExpired() {
    this.loadingExpired = true
    this.dashboardService.getExpirationKpi()
    .subscribe((totals)=> {
      this.totalExpired = totals;
      console.log(this.totalExpired)
      this.loadingExpired = false
    },(err) => {
      this.loadingExpired = false
    })
  }

  getTyreAlertsCount() {
    this.loadingTyreAlerts = true
    this.dashboardService.getTyreAlertsCount()
    .subscribe((counts)=> {
      this.tyreAlerts = this.tyreAlerts.map((item, i) => ({
        ...item,
        value: counts[i]
      }))
      this.loadingTyreAlerts = false
    },(err) => {
      this.loadingTyreAlerts = false
    })
  }
}
