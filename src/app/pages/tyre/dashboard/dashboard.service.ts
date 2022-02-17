import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { EChartsOption } from 'echarts';
import { BehaviorSubject, zip } from 'rxjs';
import { VehicleService } from 'src/app/services/vehicle.service';

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

export interface TyresExpired {
  expired:number
  ok:number
  to_expire:number
}

export interface TyresByBrand {
  name: string,
  tyres_count: number
}

export interface LifeByBrandKpi {
  avg_tyre_life: number,
  id: number,
  name: string
}

export type TotalKpiObj = ReturnType<DashboardService['getTotalKpiObj']>

export type NominalValuesKpiObj = ReturnType<DashboardService['getNominalValuesKpiObj']>

export type ExpirationKpiObj = ReturnType<DashboardService['getExpirationKpiObj']>

export type BrandKpiObj = ReturnType<DashboardService['getBrandKpiObj']>

export type FuelIndexKpiObj = ReturnType<DashboardService['getFuelIndexKpiObj']>

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private vehiclesSub = new BehaviorSubject<number>(0)

  vehicles$ = this.vehiclesSub.asObservable()

  constructor(
    private http: HttpClient
  ) { }

  getTotalsKpi() {
    return this.http.get<TotalsKpi>('kpi/total').pipe(
      map((data) => {
        this.vehiclesSub.next(data.vehicles_count)
        return this.getTotalKpiObj(data)
      })
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

  getExpirationKpi() {
    return this.http.get<TyresExpired>('kpi/tyres_by_expiration').pipe(
      map(data => {
        return this.getExpirationKpiObj(data)
      })
    )
  }

  getTyresByBrand() {
    return this.http.get<TyresByBrand[]>('kpi/tyres_by_brand').pipe(
      map(data => {
        return this.getBrandKpiObj(data)
      })
    )
  }

  getTyreAlertsCount() {
    let urls = [
      'high_temp_alerts_count',
      'tpms_without_log_hours_count',
      'high_pressure_alerts_count',
      'low_pressure_alerts_count'
    ]

    const requests = urls.map((item) => {
     return this.http.get<{count: number}>(`kpi/${item}`).pipe(map((data) => data.count))
    })

    return zip(...requests)
  }

  getVehicleFuelSummary() {
    let urls = [
      'tpms_without_log_count',
      'vehicles_with_excessive_fuel_consumption_summary'
    ]
    const requests = urls.map((item) => {
     return this.http.get<{count: number, data?: number[]}>(`kpi/${item}`)
    })

    return zip(...requests).pipe(
      map((responses) => {
        let result = {
          withoutLogCount: responses[0].count,
          fuelCount: responses[1].count,
          fuelChart: this.getFuelIndexKpiObj(responses[1].data)
        }
        return result
      })
    )
  }

  getAsymmetryAlertsCount() {
    let urls = [
      'temperature_asymmetry_count',
      'pressure_asymmetry_count'
    ]
    const requests = urls.map((item) => {
      return this.http.get<{count: number}>(`kpi/${item}`).pipe(map((data) => data.count))
     })

     return zip(...requests)
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

  private getNominalValuesKpiObj(data: {ok_count: number, high_count: number, low_count: number}, name: string) {
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

  private getBrandKpiObj(data: TyresByBrand[]) {
    const filtered = data.sort((a, b) => a.tyres_count - b.tyres_count).slice(0, 10)
    const names = filtered.map(item => item.name)
    const values = filtered.map(item => item.tyres_count)

    if (!values.length) {
      return false
    }
    return this.getBarChart(values, names)
  }

  private getFuelIndexKpiObj(values: number[] = []) {
    if (!values.length) {
      return false
    }
    let ok_count = 0
    let high_count = 0
    let low_count = 0
    values.forEach((value) => {
      if (value <= 5) {
        low_count ++
      } else if (value >= 10) {
        high_count ++
      } else {
        ok_count ++
      }
    })
    return this.getNominalValuesKpiObj({ok_count, high_count, low_count}, 'INDICE DE COMBUSTIBLE')
  }

  private getBarChart (values: number[], names: string[]) {
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
        data: names
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

    return brandChartOption;
  }

  getExpirationKpiObj(data: TyresExpired) {
    const values = [
    {
      name: 'AL DÍA',
      value: data.ok
    },
    {
      name: 'PROXIMOS A VENCER',
      value: data.to_expire
    },
    {
      name: 'VENCIDOS',
      value: data.expired
    }];
    const total = values.reduce((prev, current) => current.value + prev, 0)
    const revisionChartOption = values.map((current) => {
      const percentage = ((current.value/total)* 100).toFixed(0)
      const chart = {
        title: {
          text: `${percentage}%`,
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
              { value: current.value, name: current.name },
              {
                tooltip: {
                  show: false
                },
                value: total - current.value,
                emphasis: {
                  disabled: true
                },
                itemStyle: {
                  color: 'grey',
                }
              },
            ]
          }
        ]
      }
      return {
        name: current.name,
        value: current.value,
        chart: chart as EChartsOption
      }
    })

    return revisionChartOption;
  }
}
