import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, map } from 'rxjs/operators';
import { EChartsOption } from 'echarts';
import { throwError } from 'rxjs';

export interface TotalsKpi {
  buyed_count: 0,
  desechados_count: 0,
  pinchados_count: 0,
  recauchados_count: 0,
  tyres_count: 11,
  vehicles_count: 17
}

export interface NominalValuesKpi {
  high: string[]
  high_count: number
  low: string[]
  low_count: number
  ok: string[]
  ok_count: number
  total_count: number
}

export interface TyresByBrand {
  name: string,
  tyres_count: number
}


export type TotalKpiObj = ReturnType<DashboardService['getTotalKpiObj']>

export type NominalValuesKpiObj = ReturnType<DashboardService['getNominalValuesKpiObj']>

export type BrandKpiObj = ReturnType<DashboardService['getBrandKpi']>

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  getTotalsKpi() {
    return this.http.get<TotalsKpi>('kpi/total').pipe(
      map((data) => this.getTotalKpiObj(data))
    )
  }

  getPressureKpi(finalizeCb = () => {}) {
    return this.http.get<NominalValuesKpi>('kpi/pressure').pipe(
      map(data => {
        return this.getNominalValuesKpiObj(data, 'PRESIÓN DE NEUMÁTICOS')
      }),
      finalize(finalizeCb)
    )
  }

  getTemperatureKpi(finalizeCb = () => {}) {
    return this.http.get<NominalValuesKpi>('kpi/temp').pipe(
      map(data => {
        return this.getNominalValuesKpiObj(data, 'PRESIÓN DE NEUMÁTICOS')
      }),
      finalize(finalizeCb)
    )
  }

  getTyresByBrand () {
    return this.http.get<TyresByBrand[]>('kpi/tyres_by_brand').pipe(
      map(data => {
        return this.getBrandKpi(data)
      })
    )
  }

  private getTotalKpiObj(data: TotalsKpi) {
    const getPercentage = (field: string) =>
      data[field] ?
      ((data[field]/data.tyres_count) * 100).toFixed(2) :
      100;
    return [
      {
        name: 'TOTAL NEUMÁTICOS',
        value: data.tyres_count,
        percentage: getPercentage('tyres_count')
      },
      {
        name: 'COMPRADOS',
        value: data.buyed_count,
        percentage: getPercentage('buyed_count')
      },
      {
        name: 'RECAUCHADOS',
        value: data.recauchados_count,
        percentage: getPercentage('recauchados_count')
      },
      {
        name: 'PINCHADOS',
        value: data.pinchados_count,
        percentage: getPercentage('pinchados_count'),
      },
      {
        name: 'DESECHADOS',
        value: data.desechados_count,
        percentage: getPercentage('desechados_count')
      }
    ]
  }

  private getNominalValuesKpiObj(data: NominalValuesKpi, name: string) {
    const chartOption: EChartsOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '10%',
        orient: 'vertical',
        right: 'right',
        textStyle: {
          color: '#fff'
        }
      },
      series: [
        {
          name,
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false
          },
          data: [
            { value: data.ok_count, name: 'ÓPTIMA', itemStyle: { color: '#51CF66' }, },
            { value: data.high_count, name: 'ALTA', itemStyle: { color: '#F03E3E' }, },
            { value: data.low_count, name: 'BAJA', itemStyle: { color: '#FCC419' }, },
          ]
        }
      ]
    };
    return chartOption
  }

  private getBrandKpi(data: TyresByBrand[]) {
    const filtered = data.sort((a, b) => a.tyres_count - b.tyres_count).slice(0, 10)
    const brands = filtered.map(item => item.name)
    const values = filtered.map(item => item.tyres_count)

    if (!values.length) {
      return false
    }

    const brandChartOption: EChartsOption = {
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
        data: brands
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
          data: values
        }
      ]
    }
    return brandChartOption
  }
}
