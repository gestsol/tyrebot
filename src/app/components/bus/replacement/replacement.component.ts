import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { TyreState } from 'src/app/services/tyre.service';

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
    this.insertNoSignalText(TyreState.NoSignal)
    this.insertNoSignalText(TyreState.NoSignal48)
  }

  insertNoSignalText(state: TyreState) {
    if (this.state.includes(state)) {
      const interval = setInterval(() => {
        const nodes = this.replaceTemplateRef.element.nativeElement?.querySelectorAll(`.${this.state} #Tire_${this.type}R text`)
        if (nodes?.length) {
          nodes[0].innerHTML = state === TyreState.NoSignal? 'Sin': 'Sin Señal'
          nodes[0].setAttribute('transform', `translate(${state === TyreState.NoSignal? '64.5': '46.5'} 66.07)`)
          nodes[1].innerHTML = state === TyreState.NoSignal? 'Señal': '48h'
          nodes[1].setAttribute('transform', `translate(${state === TyreState.NoSignal? '58.05': '61.05'} 82.07)`)
          clearInterval(interval)
        }
      }, 100)
    }
  }
}
