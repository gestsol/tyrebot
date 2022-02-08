import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-replacement',
  templateUrl: './replacement.component.html',
  styleUrls: ['./replacement.component.scss']
})
export class ReplacementComponent implements AfterViewInit {
  @Input() type: number = 1;
  @Input() state: string = '';
  @ViewChild(SvgIconComponent) replaceTemplateRef!: any
  constructor() { }

  ngAfterViewInit(): void {
    if (this.state.includes('NO_SIGNAL')) {
      const interval = setInterval(() => {
        const nodes = this.replaceTemplateRef.element.nativeElement?.querySelectorAll(`.${this.state} #Tire_${this.type}R text`)
        if (nodes?.length) {
          nodes[0].innerHTML = 'Sin'
          nodes[0].setAttribute('transform', 'translate(64.5 66.07)')
          nodes[1].innerHTML = 'Señal'
          nodes[1].setAttribute('transform', 'translate(58.05 82.07)')
          clearInterval(interval)
        }
      }, 100)
    }
  }

}
