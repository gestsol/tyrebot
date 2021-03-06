import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { TyreState } from 'src/app/services/tyre.service';

@Component({
  selector: 'app-axie',
  templateUrl: './axie.component.html',
  styleUrls: ['./axie.component.scss']
})
export class AxieComponent implements AfterViewInit {
  @Input() axie = 1
  @Input() type = 2
  @Input() tyres: any[] = []
  @ViewChild(SvgIconComponent) axieTemplateRef!: any
  intervals: number[] = []
  classes: string[] = []

  constructor() { }

  ngAfterViewInit(): void {
    this.tyres.forEach((item, i) => {
      const tyre = i + 1
      const newClass = item.state? `${item.state}-${tyre}`: ''
      this.insertNoSignalText(newClass, tyre, TyreState.NoSignal)
      this.insertNoSignalText(newClass, tyre, TyreState.NoSignal48)
      this.classes.push(newClass)
    })
  }

  insertNoSignalText(className: string, tyre: number, state: TyreState) {
    if (className.includes(state)) {
      const interval = setInterval(() => {
        const node = this.axieTemplateRef.element.nativeElement?.querySelector(`.${className} #Tire_${tyre} text`)
        if (node) {
          node.innerHTML = state === TyreState.NoSignal ? 'Sin Señal' : 'Sin Señal 48h'
          const attribute = node.getAttribute('transform') as string
          const splited = attribute.split(' ')
          splited[0] = `translate(${state === TyreState.NoSignal? '68': '48'}`
          const newAttribute = splited.join(' ')
          node.setAttribute('transform', newAttribute)
          clearInterval(interval)
        }
      }, 100)
    }
  }

}
