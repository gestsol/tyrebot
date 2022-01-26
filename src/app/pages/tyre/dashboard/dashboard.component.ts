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
      percentage: '50'
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
          { value: 81, name: 'ÓPTIMA' },
          { value: 11, name: 'ALTA' },
          { value: 9, name: 'BAJA' },
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
          { value: 81, name: 'ÓPTIMA' },
          { value: 11, name: 'ALTA' },
          { value: 9, name: 'BAJA' },
        ]
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
