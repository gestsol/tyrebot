import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';
import { BrandKpiObj, DashboardService, NominalValuesKpiObj, TotalKpiObj, TotalsKpi } from '../dashboard.service';

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

  totalKpis: TotalKpiObj = new Array(5).fill({})
  totalPressure: NominalValuesKpiObj | null = null
  totalTemperature: NominalValuesKpiObj | null = null
  totalBrand: BrandKpiObj | null = null

  brandChartOption: EChartsOption = {
    grid: {
      containLabel: true,
      bottom: 0,
      left: 0
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      show: false
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01],
      axisLabel: {
        color: '#fff'
      },
      axisLine: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#666'
        }
      }
    },
    yAxis: {
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#fff'
      },
      axisLine: {
        show: false
      },
      type: 'category',
      boundaryGap: true,
      data: ['Dunlop', 'Pirelli', 'Bridgestone', 'Michelin', 'Good Year', 'Firestone']
    },
    series: [
      {
        barWidth: 20,
        itemStyle: {
          borderRadius: 15,
          color: '#FCC419'
        },
        name: '2011',
        type: 'bar',
        data: [3500, 4100, 4700, 5690, 7800, 8500]
      }
    ]
  }

  revisionChartOption: EChartsOption = {
    title: {
      text: '62%',
      top: 'middle',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: false
    },
    series: [
      {
        name: 'REVISIÓN NEUMÁTICOS',
        type: 'pie',
        radius: ['60%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        data: [
          { value: 62, name: 'ÓPTIMA' },
          { value: 11, name: 'ALTA' },
        ]
      }
    ]
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getKpis();
  }

  getKpis() {
    this.getTotals()
    this.getPressure()
    this.getTemperature()
    this.getBrands()
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

  toPressureList() {
    this.toRoute('../pressure-list');
  }

  toTemperatureList() {
    this.toRoute('../temperature-list');
  }

  toRoute(relativeUrl: string) {
    this.router.navigate([relativeUrl], {
      relativeTo: this.route
    })
  }

}
