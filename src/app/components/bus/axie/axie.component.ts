import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';

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
      if (newClass.includes('NO_SIGNAL')) {
        const interval = setInterval(() => {
          const node = this.axieTemplateRef.element.nativeElement?.querySelector(`.${newClass} #Tire_${tyre} text`)
          if (node) {
            node.innerHTML = 'Sin Señal'
            node.setAttribute('transform', 'translate(68 352.62)')
            clearInterval(interval)
          }
        }, 100)
      }
      this.classes.push(newClass)
    })
  }

}
