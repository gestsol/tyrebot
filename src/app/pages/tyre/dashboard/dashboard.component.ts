import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalKpis = [
    {
      name: 'TOTAL NEUMÁTICOS',
      value: 4000,
      percentage: '100'
    },
    {
      name: 'COMPRADOS',
      value: 245,
      percentage: '70'
    },
    {
      name: 'RECAUCHADOS',
      value: 100,
      percentage: '30'
    },
    {
      name: 'PINCHADOS',
      value: 3520,
      percentage: '50',
    },
    {
      name: 'DESECHADOS',
      value: 1000,
      percentage: '50'
    }
  ]

  chartOption: EChartsOption = {
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
        name: 'PRESIÓN DE NEUMÁTICOS',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false
        },
        data: [
          { value: 81, name: 'ÓPTIMA', itemStyle: { color: '#51CF66' }, },
          { value: 11, name: 'ALTA', itemStyle: { color: '#F03E3E' }, },
          { value: 9, name: 'BAJA', itemStyle: { color: '#FCC419' }, },
        ]
      }
    ]
  };

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

  constructor() { }

  ngOnInit(): void {
  }

}
