import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { EChartsOption } from 'echarts';
import { BehaviorSubject } from 'rxjs';
import { VehicleService } from 'src/app/services/vehicle.service';

export enum TableType {
  pressure_low = "pressure_low",
  pressure_ok = "pressure_ok",
  pressure_high = "pressure_high",
  temp_low = "temp_low",
  temp_ok = "temp_ok",
  temp_high = "temp_high"
}

export const PressureType = {
  0: TableType.pressure_ok,
  1: TableType.pressure_high,
  2: TableType.pressure_low
}

export const TempType = {
  0: TableType.temp_ok,
  1: TableType.temp_high,
  2: TableType.temp_low
}

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
  private vehiclesSub = new BehaviorSubject<number>(0)

  vehicles$ = this.vehiclesSub.asObservable()

  constructor(
    private http: HttpClient,
    private vehicleService: VehicleService
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

  getTyresByBrand () {
    return this.http.get<TyresByBrand[]>('kpi/tyres_by_brand').pipe(
      map(data => {
        return this.getBrandKpi(data)
      })
    )
  }

  getTableLecture(type: TableType) {
    return this.http.get<{data: any}>(`kpi/vehicles_${type}`).pipe(
      map((data: any) => {
        let response = data.data.map((item) => {
          return {
            id: item.id,
            chassis: item.chassis,
            internal_number: item.internal_number,
            plate: item.plate,
            hubName: item.hub_meta?.name,
            axies: this.vehicleService.getAxies(item.tyres).axies_count}
        })
        return {data: response, total_entries: response.length}
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
